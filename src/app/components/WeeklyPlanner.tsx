import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from 'sonner';

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}

interface OutfitPlan {
  id: string;
  date: string;
  items: string[];
  notes?: string;
}

interface WeeklyPlannerProps {
  items: ClothingItem[];
  plans: OutfitPlan[];
  onAddPlan: (plan: Omit<OutfitPlan, 'id'>) => void;
  onDeletePlan: (id: string) => void;
}

export function WeeklyPlanner({ items, plans, onAddPlan, onDeletePlan }: WeeklyPlannerProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getPlanForDate = (date: Date) => {
    return plans.find(plan => isSameDay(new Date(plan.date), date));
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handleOpenDialog = (date: Date) => {
    const existingPlan = getPlanForDate(date);
    setSelectedDate(date);
    setSelectedItems(existingPlan?.items || []);
    setNotes(existingPlan?.notes || '');
  };

  const handleCloseDialog = () => {
    setSelectedDate(null);
    setSelectedItems([]);
    setNotes('');
  };

  const toggleItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSavePlan = () => {
    if (!selectedDate || selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    // Delete existing plan for this date if any
    const existingPlan = getPlanForDate(selectedDate);
    if (existingPlan) {
      onDeletePlan(existingPlan.id);
    }

    onAddPlan({
      date: selectedDate.toISOString(),
      items: selectedItems,
      notes: notes.trim() || undefined,
    });

    handleCloseDialog();
    toast.success('Đã lưu kế hoạch outfit!');
  };

  const handleDeletePlan = (date: Date) => {
    const plan = getPlanForDate(date);
    if (plan) {
      onDeletePlan(plan.id);
      toast.success('Đã xóa kế hoạch');
    }
  };

  const getItemsByIds = (ids: string[]) => {
    return ids.map(id => items.find(item => item.id === id)).filter(Boolean) as ClothingItem[];
  };

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg">
        <Button size="icon" variant="outline" onClick={handlePreviousWeek} className="rounded-xl">
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-center">
          <h3 className="font-semibold">
            {format(weekDays[0], 'dd/MM', { locale: vi })} - {format(weekDays[6], 'dd/MM/yyyy', { locale: vi })}
          </h3>
          <p className="text-sm text-muted-foreground">Tuần {format(currentWeekStart, 'w', { locale: vi })}</p>
        </div>
        <Button size="icon" variant="outline" onClick={handleNextWeek} className="rounded-xl">
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const plan = getPlanForDate(day);
          const isToday = isSameDay(day, new Date());
          const planItems = plan ? getItemsByIds(plan.items) : [];

          return (
            <Card
              key={day.toISOString()}
              className={`p-4 hover:shadow-xl transition-all duration-300 border-0 shadow-md ${
                isToday ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">
                      {format(day, 'EEEE', { locale: vi })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(day, 'dd/MM')}
                    </p>
                  </div>
                  {isToday && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Hôm nay</Badge>
                  )}
                </div>

                {plan ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {planItems.slice(0, 4).map((item) => (
                        <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {planItems.length > 4 && (
                        <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                          +{planItems.length - 4}
                        </div>
                      )}
                    </div>
                    {plan.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {plan.notes}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 hover:bg-purple-50"
                        onClick={() => handleOpenDialog(day)}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50"
                        onClick={() => handleDeletePlan(day)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                    onClick={() => handleOpenDialog(day)}
                  >
                    <Plus className="size-4 mr-2" />
                    Thêm outfit
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Outfit Dialog */}
      <Dialog open={!!selectedDate} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, "EEEE, dd 'tháng' MM", { locale: vi })}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Item Selection */}
            <div className="space-y-3">
              <Label>Chọn trang phục ({selectedItems.length} sản phẩm)</Label>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chưa có sản phẩm nào trong tủ đồ
                </p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedItems.includes(item.id)
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="aspect-square">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedItems.includes(item.id) && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <Checkbox checked={true} className="pointer-events-none" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-xs text-white truncate">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Họp khách hàng, đi ăn tối..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={handleCloseDialog}>
                Hủy
              </Button>
              <Button onClick={handleSavePlan}>
                Lưu kế hoạch
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}