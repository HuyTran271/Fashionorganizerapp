import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { Plus, Shirt, Calendar, Sparkles } from 'lucide-react';
import { AddItemModal } from '@/app/components/AddItemModal';
import { ItemsGallery } from '@/app/components/ItemsGallery';
import { WeeklyPlanner } from '@/app/components/WeeklyPlanner';
import { AIAssistant } from '@/app/components/AIAssistant';
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

const STORAGE_ITEMS_KEY = 'wardrobe-items';
const STORAGE_PLANS_KEY = 'wardrobe-plans';

export default function Wardrobe() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [plans, setPlans] = useState<OutfitPlan[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('wardrobe');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem(STORAGE_ITEMS_KEY);
    const savedPlans = localStorage.getItem(STORAGE_PLANS_KEY);
    
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Error loading items:', e);
      }
    }
    
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error('Error loading plans:', e);
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_PLANS_KEY, JSON.stringify(plans));
  }, [plans]);

  const handleAddItem = (itemData: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    const newItem: ClothingItem = {
      ...itemData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    // Also remove this item from any plans
    setPlans(plans.map(plan => ({
      ...plan,
      items: plan.items.filter(itemId => itemId !== id),
    })).filter(plan => plan.items.length > 0));
    toast.success('Đã xóa sản phẩm');
  };

  const handleAddPlan = (planData: Omit<OutfitPlan, 'id'>) => {
    const newPlan: OutfitPlan = {
      ...planData,
      id: crypto.randomUUID(),
    };
    setPlans([...plans, newPlan]);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Tủ Đồ của Tôi
          </h1>
          <p className="text-muted-foreground text-lg">
            Quản lý trang phục, lập lịch outfit và nhận gợi ý từ AI
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-white/80 backdrop-blur shadow-lg">
            <TabsTrigger value="wardrobe" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Shirt className="size-4" />
              Tủ đồ
            </TabsTrigger>
            <TabsTrigger value="planner" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Calendar className="size-4" />
              Lịch trình
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Sparkles className="size-4" />
              AI Gợi ý
            </TabsTrigger>
          </TabsList>

          {/* Wardrobe Tab */}
          <TabsContent value="wardrobe" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Tủ đồ của tôi</h2>
                <p className="text-sm text-muted-foreground">
                  {items.length} sản phẩm
                </p>
              </div>
              <Button 
                onClick={() => setShowAddModal(true)} 
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
              >
                <Plus className="size-4" />
                Thêm sản phẩm
              </Button>
            </div>
            <ItemsGallery items={items} onDelete={handleDeleteItem} />
          </TabsContent>

          {/* Planner Tab */}
          <TabsContent value="planner" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Lịch trình outfit</h2>
              <p className="text-sm text-muted-foreground">
                Lập kế hoạch trang phục cho từng ngày trong tuần
              </p>
            </div>
            <WeeklyPlanner
              items={items}
              plans={plans}
              onAddPlan={handleAddPlan}
              onDeletePlan={handleDeletePlan}
            />
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai">
            <AIAssistant items={items} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
