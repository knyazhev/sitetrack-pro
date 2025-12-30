import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { User, UserRole, Employee } from '@/types';

interface AuthState {
  user: User | null;
  employee: Employee | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo (will be replaced with Supabase)
const DEMO_USERS: Record<string, { user: User; employee: Employee }> = {
  'worker@demo.com': {
    user: {
      id: 'u1',
      email: 'worker@demo.com',
      phone: '+7 999 111 2233',
      role: 'worker',
      employee_id: 'e1',
      created_at: '2024-01-15',
      last_login: new Date().toISOString(),
    },
    employee: {
      id: 'e1',
      user_id: 'u1',
      first_name: 'Иван',
      last_name: 'Петров',
      phone: '+7 999 111 2233',
      position: 'Каменщик',
      status: 'active',
      hire_date: '2023-06-01',
      certifications: ['Охрана труда', 'Высотные работы'],
      created_at: '2023-06-01',
      updated_at: '2024-01-15',
    },
  },
  'foreman@demo.com': {
    user: {
      id: 'u2',
      email: 'foreman@demo.com',
      phone: '+7 999 222 3344',
      role: 'foreman',
      employee_id: 'e2',
      created_at: '2024-01-10',
      last_login: new Date().toISOString(),
    },
    employee: {
      id: 'e2',
      user_id: 'u2',
      first_name: 'Сергей',
      last_name: 'Михайлов',
      phone: '+7 999 222 3344',
      position: 'Прораб',
      status: 'active',
      hire_date: '2022-03-15',
      certifications: ['Охрана труда', 'Управление объектами', 'Пожарная безопасность'],
      created_at: '2022-03-15',
      updated_at: '2024-01-10',
    },
  },
  'timekeeper@demo.com': {
    user: {
      id: 'u3',
      email: 'timekeeper@demo.com',
      role: 'timekeeper',
      created_at: '2024-01-01',
      last_login: new Date().toISOString(),
    },
    employee: {
      id: 'e3',
      user_id: 'u3',
      first_name: 'Анна',
      last_name: 'Козлова',
      phone: '+7 999 333 4455',
      position: 'Табельщик',
      status: 'active',
      hire_date: '2023-01-10',
      certifications: ['Кадровый учёт'],
      created_at: '2023-01-10',
      updated_at: '2024-01-01',
    },
  },
  'director@demo.com': {
    user: {
      id: 'u4',
      email: 'director@demo.com',
      role: 'director',
      created_at: '2023-01-01',
      last_login: new Date().toISOString(),
    },
    employee: {
      id: 'e4',
      user_id: 'u4',
      first_name: 'Владимир',
      last_name: 'Соколов',
      phone: '+7 999 444 5566',
      position: 'Директор',
      status: 'active',
      hire_date: '2020-01-01',
      certifications: ['MBA', 'PMP'],
      created_at: '2020-01-01',
      updated_at: '2023-01-01',
    },
  },
  'admin@demo.com': {
    user: {
      id: 'u5',
      email: 'admin@demo.com',
      role: 'admin',
      created_at: '2020-01-01',
      last_login: new Date().toISOString(),
    },
    employee: {
      id: 'e5',
      user_id: 'u5',
      first_name: 'Системный',
      last_name: 'Администратор',
      phone: '+7 999 555 6677',
      position: 'Администратор',
      status: 'active',
      hire_date: '2020-01-01',
      certifications: [],
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    employee: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tt_user');
    const storedEmployee = localStorage.getItem('tt_employee');
    
    if (storedUser && storedEmployee) {
      setState({
        user: JSON.parse(storedUser),
        employee: JSON.parse(storedEmployee),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoData = DEMO_USERS[email.toLowerCase()];
    if (!demoData) {
      throw new Error('Неверный email или пароль');
    }

    localStorage.setItem('tt_user', JSON.stringify(demoData.user));
    localStorage.setItem('tt_employee', JSON.stringify(demoData.employee));

    setState({
      user: demoData.user,
      employee: demoData.employee,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('tt_user');
    localStorage.removeItem('tt_employee');
    setState({
      user: null,
      employee: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
