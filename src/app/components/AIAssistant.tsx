import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}

interface AIAssistantProps {
  items: ClothingItem[];
}

interface Suggestion {
  title: string;
  description: string;
  items: ClothingItem[];
  occasion: string;
}

export function AIAssistant({ items }: AIAssistantProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newSuggestions: Suggestion[] = [];
      
      // Get current season
      const month = new Date().getMonth();
      let season = 'Hè';
      if (month >= 2 && month <= 4) season = 'Xuân';
      else if (month >= 8 && month <= 10) season = 'Thu';
      else if (month >= 11 || month <= 1) season = 'Đông';

      // Filter items by season
      const seasonalItems = items.filter(item => 
        item.tags.includes(season) || item.tags.length === 0
      );

      // Generate office look
      const officeItems = items.filter(item => item.tags.includes('Công sở'));
      if (officeItems.length >= 2) {
        const top = officeItems.find(item => item.category === 'top' || item.category === 'dress');
        const bottom = officeItems.find(item => item.category === 'bottom');
        const shoes = officeItems.find(item => item.category === 'shoes');
        
        const outfit = [top, bottom, shoes].filter(Boolean) as ClothingItem[];
        if (outfit.length >= 2) {
          newSuggestions.push({
            title: 'Outfit công sở chuyên nghiệp',
            description: `Phù hợp cho ngày làm việc quan trọng, họp khách hàng, hoặc thuyết trình.`,
            items: outfit,
            occasion: 'Công sở',
          });
        }
      }

      // Generate casual look
      const casualItems = items.filter(item => 
        item.tags.includes('Dạo phố') || item.tags.includes('Đi chơi')
      );
      if (casualItems.length >= 2) {
        const top = casualItems.find(item => item.category === 'top');
        const bottom = casualItems.find(item => item.category === 'bottom' || item.category === 'dress');
        const accessories = casualItems.find(item => item.category === 'accessories');
        
        const outfit = [top, bottom, accessories].filter(Boolean) as ClothingItem[];
        if (outfit.length >= 2) {
          newSuggestions.push({
            title: 'Outfit dạo phố thoải mái',
            description: 'Phong cách năng động, thoải mái cho ngày cuối tuần hoặc gặp bạn bè.',
            items: outfit,
            occasion: 'Dạo phố',
          });
        }
      }

      // Generate party look
      const partyItems = items.filter(item => item.tags.includes('Dự tiệc'));
      if (partyItems.length >= 1) {
        const dress = partyItems.find(item => item.category === 'dress');
        const top = partyItems.find(item => item.category === 'top');
        const bottom = partyItems.find(item => item.category === 'bottom');
        const shoes = items.find(item => item.category === 'shoes');
        
        const outfit = [dress || top, bottom, shoes].filter(Boolean) as ClothingItem[];
        if (outfit.length >= 2) {
          newSuggestions.push({
            title: 'Outfit dự tiệc nổi bật',
            description: 'Trang phục sang trọng, nổi bật cho các buổi tiệc hoặc sự kiện đặc biệt.',
            items: outfit,
            occasion: 'Dự tiệc',
          });
        }
      }

      // Generate seasonal look
      if (seasonalItems.length >= 3) {
        const top = seasonalItems.find(item => item.category === 'top');
        const bottom = seasonalItems.find(item => item.category === 'bottom' || item.category === 'dress');
        const outerwear = seasonalItems.find(item => item.category === 'outerwear');
        const shoes = seasonalItems.find(item => item.category === 'shoes');
        
        const outfit = [top, bottom, outerwear, shoes].filter(Boolean) as ClothingItem[];
        if (outfit.length >= 2) {
          newSuggestions.push({
            title: `Outfit mùa ${season}`,
            description: `Phù hợp với thời tiết và xu hướng mùa ${season}, giúp bạn luôn thoải mái và phong cách.`,
            items: outfit,
            occasion: season,
          });
        }
      }

      // Fallback: random outfit if no specific suggestions
      if (newSuggestions.length === 0 && items.length >= 2) {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const outfit = shuffled.slice(0, Math.min(4, shuffled.length));
        
        newSuggestions.push({
          title: 'Mix & Match sáng tạo',
          description: 'Thử nghiệm phong cách mới với những món đồ trong tủ của bạn!',
          items: outfit,
          occasion: 'Đa năng',
        });
      }

      setSuggestions(newSuggestions);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 shadow-lg">
        <div className="inline-flex items-center gap-2 text-3xl">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse">
            <Sparkles className="size-7 text-white" />
          </div>
          <h2 className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Gợi ý Outfit
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Để AI giúp bạn kết hợp trang phục phù hợp với mùa, dịp và phong cách
        </p>
        <Button
          size="lg"
          onClick={generateSuggestions}
          disabled={loading || items.length === 0}
          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg text-base px-8 py-6"
        >
          {loading ? (
            <>
              <RefreshCw className="size-5 animate-spin" />
              Đang phân tích tủ đồ của bạn...
            </>
          ) : (
            <>
              <Sparkles className="size-5" />
              Tạo gợi ý outfit
            </>
          )}
        </Button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-xl">✨ Gợi ý dành cho bạn:</h3>
          <div className="grid gap-6">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="p-6 hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 shrink-0">
                      {suggestion.occasion}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {suggestion.items.map((item) => (
                      <div key={item.id} className="space-y-2 group">
                        <div className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <Card className="p-12 shadow-lg border-0 bg-white">
          <div className="text-center text-muted-foreground space-y-4">
            <div className="size-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto">
              <Sparkles className="size-10 text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-lg">Tủ đồ của bạn đang trống</p>
              <p className="text-sm">Thêm sản phẩm vào tủ đồ để nhận gợi ý từ AI</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}