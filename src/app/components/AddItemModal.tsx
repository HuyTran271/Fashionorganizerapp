import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
}

const CATEGORIES = [
  { value: 'top', label: 'Áo' },
  { value: 'bottom', label: 'Quần' },
  { value: 'dress', label: 'Váy/Đầm' },
  { value: 'outerwear', label: 'Áo khoác' },
  { value: 'shoes', label: 'Giày dép' },
  { value: 'accessories', label: 'Phụ kiện' },
];

const COLOR_TAGS = [
  'Đỏ', 'Cam', 'Vàng', 'Xanh lá', 'Xanh dương', 'Tím', 'Hồng', 
  'Nâu', 'Đen', 'Trắng', 'Xám', 'Be'
];

const SEASON_TAGS = ['Xuân', 'Hạ', 'Thu', 'Đông'];
const STYLE_TAGS = ['Công sở', 'Dạo phố', 'Thể thao', 'Dự tiệc', 'Đi chơi'];

export function AddItemModal({ open, onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!name || !category || !image) {
      toast.error('Vui lòng điền đầy đủ thông tin và thêm hình ảnh');
      return;
    }

    onAdd({
      name,
      category,
      tags: selectedTags,
      image,
    });

    // Reset form
    setName('');
    setCategory('');
    setSelectedTags([]);
    setImage('');
    onClose();
    toast.success('Đã thêm sản phẩm vào tủ đồ!');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">✨ Thêm sản phẩm mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Hình ảnh</Label>
            {image ? (
              <div className="relative">
                <img src={image} alt="Preview" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3 rounded-full shadow-lg"
                  onClick={() => setImage('')}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-32 flex flex-col gap-2 rounded-2xl border-2 border-dashed hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all"
                  onClick={() => cameraInputRef.current?.click()}
                >
                  <Camera className="size-8 text-purple-500" />
                  <span>Chụp ảnh</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-32 flex flex-col gap-2 rounded-2xl border-2 border-dashed hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="size-8 text-pink-500" />
                  <span>Tải ảnh lên</span>
                </Button>
              </div>
            )}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Áo sơ mi trắng"
              className="rounded-xl"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Danh mục</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags - Colors */}
          <div className="space-y-2">
            <Label>Màu sắc</Label>
            <div className="flex flex-wrap gap-2">
              {COLOR_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags - Seasons */}
          <div className="space-y-2">
            <Label>Mùa</Label>
            <div className="flex flex-wrap gap-2">
              {SEASON_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags - Style */}
          <div className="space-y-2">
            <Label>Phong cách</Label>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose} className="rounded-xl">
              Hủy
            </Button>
            <Button onClick={handleSubmit} className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}