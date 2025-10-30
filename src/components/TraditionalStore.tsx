'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Plus, Minus, Heart, Eye, Truck, Shield, Award } from 'lucide-react';
import { imageUrls } from './ImageManager';

interface TraditionalStoreProps {
  language: 'fr' | 'ar' | 'en' | 'es';
  onAddToCart?: (product: any) => void;
}

interface Product {
  id: string;
  name: { fr: string; ar: string; en: string; es: string };
  description: { fr: string; ar: string; en: string; es: string };
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  origin: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  bestseller?: boolean;
  authentic?: boolean;
}

const products: Product[] = [
  // Merzouga - Eau de fleur d'oranger
  {
    id: 'merzouga-orange-blossom',
    name: { 
      fr: 'Eau de Fleur d\'Oranger du Sahara', 
      ar: 'ماء زهر البرتقال الصحراوي',
      en: 'Saharan Orange Blossom Water',
      es: 'Agua de Azahar del Sahara' 
    },
    description: { 
      fr: 'Eau de fleur d\'oranger pure, distillée traditionnellement dans le désert de Merzouga. Parfum envoûtant aux vertus apaisantes.',
      ar: 'ماء زهر البرتقال النقي، مقطر تقليدياً في صحراء مرزوقة. عطر ساحر بخصائص مهدئة.',
      en: 'Pure orange blossom water, traditionally distilled in the Merzouga desert. Enchanting scent with soothing properties.',
      es: 'Agua de azahar pura, destilada tradicionalmente en el desierto de Merzouga. Aroma cautivador con propiedades calmantes.'
    },
    price: 45,
    originalPrice: 60,
    image: 'https://i.pinimg.com/736x/ac/65/90/ac6590497364b5e66b1be6884b3aa7e9.jpg',
    category: 'cosmetics',
    origin: 'Merzouga',
    rating: 4.9,
    reviews: 127,
    inStock: true,
    bestseller: true,
    authentic: true
  },
  
  // Essaouira - Huile d'argan
  {
    id: 'essaouira-argan-oil',
    name: { 
      fr: 'Huile d\'Argan Pure d\'Essaouira', 
      ar: 'زيت الأركان النقي من الصويرة',
      en: 'Pure Argan Oil from Essaouira',
      es: 'Aceite de Argán Puro de Esauira' 
    },
    description: { 
      fr: 'Huile d\'argan 100% pure, pressée à froid par les coopératives féminines d\'Essaouira. Or liquide du Maroc.',
      ar: 'زيت الأركان النقي 100%، معصور على البارد من تعاونيات نساء الصويرة. الذهب السائل للمغرب.',
      en: '100% pure argan oil, cold-pressed by women cooperatives in Essaouira. Morocco’s liquid gold.',
      es: 'Aceite de argán 100% puro, prensado en frío por cooperativas de mujeres en Esauira. El oro líquido de Marruecos.'
    },
    price: 85,
    originalPrice: 110,
    image: 'https://i.pinimg.com/1200x/03/fa/43/03fa43bdc32db3eac25f32d74089aa32.jpg',
    category: 'cosmetics',
    origin: 'Essaouira',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    bestseller: true,
    authentic: true
  },

  // Fès - Savon noir
  {
    id: 'fes-black-soap',
    name: { 
      fr: 'Savon Noir de Fès aux Olives', 
      ar: 'الصابون الأسود الفاسي بالزيتون',
      en: 'Fez Black Soap with Olives',
      es: 'Jabón Negro de Fez con Aceitunas' 
    },
    description: { 
      fr: 'Savon noir traditionnel de Fès, fabriqué artisanalement avec des olives locales. Secret de beauté ancestral.',
      ar: 'الصابون الأسود التقليدي من فاس، مصنوع يدوياً بالزيتون المحلي. سر جمال أجدادنا.',
      en: 'Traditional black soap from Fez, handcrafted with local olives. Ancestral beauty secret.',
      es: 'Jabón negro tradicional de Fez, elaborado artesanalmente con aceitunas locales. Secreto de belleza ancestral.'
    },
    price: 25,
    originalPrice: 35,
    image: 'https://i.pinimg.com/736x/0d/f9/89/0df98930272750c1c3e61e0d49389e20.jpg',
    category: 'cosmetics',
    origin: 'Fès',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    authentic: true
  },

  // Marrakech - Épices
  {
    id: 'marrakech-spice-mix',
    name: { 
      fr: 'Épices', 
      ar: 'توابل',
      en: 'Spices',
      es: 'Especias' 
    },
    description: { 
      fr: 'Mélange secret de 27 épices des souks de Marrakech. Saveurs authentiques pour vos tagines.',
      ar: 'خليط سري من 27 نوع توابل من أسواق مراكش. نكهات أصيلة لطاجينكم.',
      en: 'Secret blend of 27 spices from Marrakech souks. Authentic flavors for your tagines.',
      es: 'Mezcla secreta de 27 especias de los zocos de Marrakech. Sabores auténticos para tus tajines.'
    },
    price: 35,
    image: 'https://i.pinimg.com/1200x/8c/22/e1/8c22e105de8928643f398aa894d0c82b.jpg',
    category: 'spices',
    origin: 'Marrakech',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    bestseller: true
  },

  // Chefchaouen - Tapis berbère
  {
    id: 'chefchaouen-berber-rug',
    name: { 
      fr: 'Tapis Berbère de Chefchaouen', 
      ar: 'سجادة بربرية من شفشاون',
      en: 'Berber Rug from Chefchaouen',
      es: 'Alfombra Bereber de Chefchaouen' 
    },
    description: { 
      fr: 'Tapis berbère tissé main aux motifs géométriques traditionnels. Laine locale des montagnes du Rif.',
      ar: 'سجادة بربرية منسوجة يدوياً بأشكال هندسية تقليدية. صوف محلي من جبال الريف.',
      en: 'Handwoven Berber rug with traditional geometric patterns. Local wool from the Rif mountains.',
      es: 'Alfombra bereber tejida a mano con patrones geométricos tradicionales. Lana local de las montañas del Rif.'
    },
    price: 180,
    originalPrice: 250,
    image: 'https://i.pinimg.com/736x/dd/67/a1/dd67a1f6ef2bd8be27a16a3912921843.jpg',
    category: 'textiles',
    origin: 'Chefchaouen',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    authentic: true
  },

  // Casablanca - Théière en argent
  {
    id: 'casablanca-silver-teapot',
    name: { 
      fr: 'Théière en Argent Gravée', 
      ar: 'إبريق الشاي الفضي المحفور',
      en: 'Engraved Silver Teapot',
      es: 'Tetera de Plata Grabada' 
    },
    description: { 
      fr: 'Théière en argent massif, gravée à la main par les maîtres artisans de Casablanca. Pièce d\'exception.',
      ar: 'إبريق شاي من الفضة الخالصة، محفور يدوياً من أساتذة الحرفيين في الدار البيضاء. قطعة استثنائية.',
      en: 'Solid silver teapot, hand-engraved by master artisans of Casablanca. An exceptional piece.',
      es: 'Tetera de plata maciza, grabada a mano por maestros artesanos de Casablanca. Una pieza excepcional.'
    },
    price: 320,
    originalPrice: 420,
    image: 'https://i.pinimg.com/1200x/e8/a1/c8/e8a1c8a214be6aadf1ed22cb44b13f68.jpg',
    category: 'crafts',
    origin: 'Casablanca',
    rating: 5.0,
    reviews: 23,
    inStock: true,
    authentic: true
  }
];

export default function TraditionalStore({ language, onAddToCart }: TraditionalStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = {
    all: { fr: 'Tous', ar: 'الكل', en: 'All', es: 'Todos' },
    cosmetics: { fr: 'Cosmétiques', ar: 'مستحضرات التجميل', en: 'Cosmetics', es: 'Cosméticos' },
    spices: { fr: 'Épices', ar: 'التوابل', en: 'Spices', es: 'Especias' },
    textiles: { fr: 'Textiles', ar: 'المنسوجات', en: 'Textiles', es: 'Textiles' },
    crafts: { fr: 'Artisanat', ar: 'الحرف اليدوية', en: 'Handicrafts', es: 'Artesanía' }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    if (onAddToCart) {
      const product = products.find(p => p.id === productId);
      if (product) onAddToCart(product);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  return (
    <section className={`py-20 bg-gradient-to-b from-amber-50 to-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="h-8 w-8 text-morocco-gold" />
            <h2 className="text-4xl font-bold text-gray-900">
              {language === 'fr' ? 'Boutique Traditionnelle' : language === 'ar' ? 'المتجر التقليدي' : language === 'en' ? 'Traditional Store' : 'Tienda Tradicional'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les trésors authentiques du Maroc. Produits artisanaux sélectionnés dans chaque région.'
              : language === 'ar'
                ? 'اكتشف كنوز المغرب الأصيلة. منتجات حرفية مختارة من كل منطقة.'
                : language === 'en'
                  ? 'Discover Morocco’s authentic treasures. Handcrafted products selected from each region.'
                  : 'Descubre los tesoros auténticos de Marruecos. Productos artesanales seleccionados de cada región.'}
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>{language === 'fr' ? 'Authenticité Garantie' : language === 'ar' ? 'أصالة مضمونة' : language === 'en' ? 'Authenticity Guaranteed' : 'Autenticidad Garantizada'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              <span>{language === 'fr' ? 'Livraison Mondiale' : language === 'ar' ? 'توصيل عالمي' : language === 'en' ? 'Worldwide Delivery' : 'Entrega Mundial'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-morocco-gold" />
              <span>{language === 'fr' ? 'Artisans Certifiés' : language === 'ar' ? 'حرفيون معتمدون' : language === 'en' ? 'Certified Artisans' : 'Artesanos Certificados'}</span>
            </div>
          </div>
        </div>

        {/* Cart Summary (if items) */}
        {getTotalItems() > 0 && (
          <div className="bg-morocco-gold text-black p-4 rounded-lg mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-medium">
                {getTotalItems()} {language === 'fr' ? 'articles' : language === 'ar' ? 'عناصر' : language === 'en' ? 'items' : 'artículos'} - {getTotalPrice()}€
              </span>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              {language === 'fr' ? 'Voir le Panier' : language === 'ar' ? 'عرض السلة' : language === 'en' ? 'View Cart' : 'Ver Carrito'}
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-morocco-gold text-black shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category[language]}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.bestseller && (
                    <span className="bg-morocco-red text-white px-3 py-1 rounded-full text-xs font-bold">
                      {language === 'fr' ? 'Best-seller' : language === 'ar' ? 'الأكثر مبيعاً' : language === 'en' ? 'Best-seller' : 'Más vendido'}
                    </span>
                  )}
                  {product.authentic && (
                    <span className="bg-morocco-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                      {language === 'fr' ? 'Authentique' : language === 'ar' ? 'أصيل' : language === 'en' ? 'Authentic' : 'Auténtico'}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                {/* Origin Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    📍 {product.origin}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name[language]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description[language]}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} {language === 'fr' ? 'avis' : language === 'ar' ? 'تقييم' : language === 'en' ? 'reviews' : 'reseñas'})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-morocco-red">
                    {product.price}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}€
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <div className="flex items-center gap-3">
                  {cart[product.id] > 0 ? (
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {cart[product.id]}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="p-2 bg-morocco-gold hover:bg-yellow-500 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-morocco-gold hover:bg-yellow-500 text-black'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock 
                        ? (language === 'fr' ? 'Ajouter au panier' : language === 'ar' ? 'أضف للسلة' : language === 'en' ? 'Add to cart' : 'Añadir al carrito')
                        : (language === 'fr' ? 'Rupture de stock' : language === 'ar' ? 'نفد المخزون' : language === 'en' ? 'Out of stock' : 'Agotado')
                      }
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-morocco-red to-morocco-gold rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'fr' ? 'Commande Personnalisée' : language === 'ar' ? 'طلب مخصص' : language === 'en' ? 'Custom Order' : 'Pedido Personalizado'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {language === 'fr' 
              ? 'Vous cherchez quelque chose de spécifique ? Nos artisans peuvent créer des pièces sur mesure.'
              : language === 'ar'
                ? 'تبحث عن شيء محدد؟ يمكن لحرفيينا إنشاء قطع مخصصة.'
                : language === 'en'
                  ? 'Looking for something specific? Our artisans can create custom pieces.'
                  : '¿Buscas algo específico? Nuestros artesanos pueden crear piezas a medida.'}
          </p>
          <button className="bg-white text-morocco-red hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors">
            {language === 'fr' ? 'Demander un Devis' : language === 'ar' ? 'طلب عرض سعر' : language === 'en' ? 'Request a Quote' : 'Solicitar Presupuesto'}
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2 h-64 md:h-auto">
                <div
                  className="h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProduct.image})` }}
                />
              </div>
              
              {/* Content */}
              <div className="md:w-1/2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProduct.name[language]}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {selectedProduct.description[language]}
                </p>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-morocco-red">
                    {selectedProduct.price}€
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {selectedProduct.originalPrice}€
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    addToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-morocco-gold hover:bg-yellow-500 text-black py-3 px-6 rounded-lg font-bold transition-colors"
                >
                  {language === 'fr' ? 'Ajouter au panier' : language === 'ar' ? 'أضف للسلة' : language === 'en' ? 'Add to cart' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
