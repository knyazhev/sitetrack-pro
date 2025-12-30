import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Camera, 
  ImagePlus, 
  X, 
  Send, 
  Loader2,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const REPORT_TYPES = [
  { id: 'progress', label: 'Прогресс', icon: CheckCircle2, color: 'text-success' },
  { id: 'issue', label: 'Проблема', icon: AlertTriangle, color: 'text-warning' },
  { id: 'completion', label: 'Завершение', icon: FileCheck, color: 'text-info' },
  { id: 'safety', label: 'Безопасность', icon: Shield, color: 'text-destructive' },
];

export default function WorkerReportCreate() {
  const [selectedType, setSelectedType] = useState<string>('progress');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddPhoto = () => {
    // Simulate adding photo
    const mockPhotoUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
    setPhotos((prev) => [...prev, mockPhotoUrl]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!description.trim() || photos.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Заполните все поля',
        description: 'Добавьте описание и хотя бы одно фото',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Отчёт отправлен',
      description: 'Прораб получит уведомление о вашем отчёте',
    });

    navigate('/worker/history');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <PageHeader
        icon={<Camera className="h-5 w-5" />}
        title="Фотоотчёт"
        subtitle="Создание нового отчёта"
      />

      {/* Report Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Тип отчёта</Label>
        <div className="grid grid-cols-2 gap-2">
          {REPORT_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <Card
                key={type.id}
                className={cn(
                  'cursor-pointer transition-all',
                  isSelected && 'ring-2 ring-accent border-accent'
                )}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <Icon className={cn('h-5 w-5', type.color)} />
                  <span className="text-sm font-medium">{type.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Photos */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Фотографии ({photos.length}/5)
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={photo}
                alt={`Фото ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon-sm"
                className="absolute top-1 right-1"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          {photos.length < 5 && (
            <button
              onClick={handleAddPhoto}
              className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">Добавить</span>
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium mb-3 block">
          Описание
        </Label>
        <Textarea
          id="description"
          placeholder="Опишите выполненные работы или обнаруженную проблему..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Submit */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          variant="accent"
          size="xl"
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim() || photos.length === 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Отправить отчёт
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
