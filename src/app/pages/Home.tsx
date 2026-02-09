import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { TrendingUp, Clock, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  views: string;
  date: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Xu hướng thời trang Thu Đông 2026',
    description: 'Khám phá những xu hướng thời trang mới nhất cho mùa Thu Đông 2026, từ màu sắc đến chất liệu và phom dáng đang được yêu thích.',
    image: 'https://images.unsplash.com/photo-1768134152610-27355e256513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBmYXNoaW9uJTIwY29hdHxlbnwxfHx8fDE3NzA2MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Xu hướng',
    readTime: '5 phút',
    views: '2.3k',
    date: '8/02/2026'
  },
  {
    id: '2',
    title: 'Cách phối đồ với giày sneakers',
    description: 'Bí quyết mix & match giày sneakers với nhiều phong cách khác nhau, từ casual đến street style và smart casual.',
    image: 'https://images.unsplash.com/photo-1759542890353-35f5568c1c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzcwNjEyMjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Phối đồ',
    readTime: '7 phút',
    views: '3.5k',
    date: '7/02/2026'
  },
  {
    id: '3',
    title: 'Minimalism trong thời trang',
    description: 'Phong cách tối giản đang trở thành xu hướng được nhiều người yêu thích. Tìm hiểu cách xây dựng tủ đồ minimalist hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1621004805829-94ac33d1cd91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDUxMTUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Phong cách',
    readTime: '6 phút',
    views: '1.9k',
    date: '6/02/2026'
  },
  {
    id: '4',
    title: 'Thời trang bền vững',
    description: 'Làm thế nào để xây dựng lối sống thời trang bền vững và có trách nhiệm với môi trường trong năm 2026.',
    image: 'https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjbG90aGluZ3xlbnwxfHx8fDE3NzA2MTIyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bền vững',
    readTime: '8 phút',
    views: '1.5k',
    date: '5/02/2026'
  },
  {
    id: '5',
    title: 'Váy đầm cho mùa Xuân',
    description: 'Những mẫu váy đầm nhẹ nhàng, thanh lịch cho mùa Xuân 2026, từ họa tiết hoa đến màu sắc pastel dịu dàng.',
    image: 'https://images.unsplash.com/photo-1770251910712-f3e2f0f3781e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmYXNoaW9uJTIwZHJlc3N8ZW58MXx8fHwxNzcwNjEyMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Xu hướng',
    readTime: '5 phút',
    views: '2.8k',
    date: '4/02/2026'
  },
  {
    id: '6',
    title: '10 món đồ cơ bản cần có',
    description: 'Tủ đồ capsule wardrobe với 10 món đồ cơ bản mà mọi người nên có để dễ dàng phối đồ mỗi ngày.',
    image: 'https://images.unsplash.com/photo-1661081738748-697923fbd1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbWFnYXppbmUlMjBtb2RlbHxlbnwxfHx8fDE3NzA2MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tips',
    readTime: '10 phút',
    views: '4.2k',
    date: '3/02/2026'
  }
];

const shoppingItems: ShoppingItem[] = [
  {
    id: '1',
    name: 'Áo khoác dáng dài',
    brand: 'Zara',
    price: '1.299.000đ',
    image: 'https://images.unsplash.com/photo-1768134152610-27355e256513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBmYXNoaW9uJTIwY29hdHxlbnwxfHx8fDE3NzA2MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Áo khoác'
  },
  {
    id: '2',
    name: 'Giày sneakers trắng',
    brand: 'Nike',
    price: '2.199.000đ',
    image: 'https://images.unsplash.com/photo-1759542890353-35f5568c1c90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc25lYWtlcnN8ZW58MXx8fHwxNzcwNjEyMjY4fDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Giày'
  },
  {
    id: '3',
    name: 'Túi xách da',
    brand: 'Mango',
    price: '899.000đ',
    image: 'https://images.unsplash.com/photo-1621004805829-94ac33d1cd91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDUxMTUzM3ww&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Phụ kiện'
  },
  {
    id: '4',
    name: 'Váy midi họa tiết',
    brand: 'H&M',
    price: '799.000đ',
    image: 'https://images.unsplash.com/photo-1770251910712-f3e2f0f3781e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmYXNoaW9uJTIwZHJlc3N8ZW58MXx8fHwxNzcwNjEyMjY3fDA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'Váy'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Khám phá Thời Trang
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cập nhật xu hướng mới nhất và tìm kiếm ý tưởng mua sắm cho tủ đồ của bạn
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/wardrobe">
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
                <Sparkles className="size-4" />
                Vào tủ đồ của tôi
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Article */}
        {articles[0] && (
          <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur hover:shadow-2xl transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <ImageWithFallback
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <TrendingUp className="size-3 mr-1" />
                  Nổi bật
                </Badge>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{articles[0].category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {articles[0].readTime}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Eye className="size-3" />
                    {articles[0].views}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{articles[0].title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {articles[0].description}
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Đọc tiếp
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Bài viết mới nhất</h2>
            <Button variant="outline">Xem tất cả</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="size-3" />
                      {article.views}
                    </span>
                    <span className="ml-auto">{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shopping Recommendations */}
        <div className="bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-blue-100/50 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Gợi ý mua sắm</h2>
              <p className="text-muted-foreground">Những sản phẩm đang được yêu thích</p>
            </div>
            <Button variant="outline" className="gap-2">
              <ShoppingBag className="size-4" />
              Xem thêm
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shoppingItems.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
                  <CardTitle className="text-sm line-clamp-2 mb-2">{item.name}</CardTitle>
                  <p className="font-bold text-purple-600">{item.price}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center p-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white border-none shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <Sparkles className="size-12 mx-auto" />
            <h2 className="text-3xl font-bold">Bắt đầu quản lý tủ đồ của bạn</h2>
            <p className="text-white/90 text-lg">
              Tổ chức tủ đồ thông minh, lập lịch outfit và nhận gợi ý từ AI
            </p>
            <Link to="/wardrobe">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                Khám phá ngay
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
