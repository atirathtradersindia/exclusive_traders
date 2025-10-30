import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import BuyModal from './BuyModal';

const Products = ({ industry, goBackToProducts, searchTerm, currentUser, onAuthRequired, isSidebarOpen, toggleSidebar }) => {
    // Define valid industries
    const validIndustries = [
        'Chocolate', 'Rice', 'Perfumes', 'Clothes', 'Electronics',
        'Fruits', 'Vegetables', 'Spices', 'Pulses', 'Dry Fruits',
        'Flowers', 'Oil', 'Beverages', 'Tea'
    ];

    // Initialize state with values from localStorage or defaults
    const [selectedBrand, setSelectedBrand] = useState(() => {
        return localStorage.getItem(`selectedBrand_${industry}`) || '';
    });
    const [currentIndustry, setCurrentIndustry] = useState(() => {
        const storedIndustry = localStorage.getItem('currentIndustry');
        return validIndustries.includes(storedIndustry) ? storedIndustry :
               validIndustries.includes(industry) ? industry : 'Chocolate';
    });
    const [currentSearchTerm, setCurrentSearchTerm] = useState(() => {
        return localStorage.getItem(`searchTerm_${industry}`) || searchTerm || '';
    });
    const [selectedIndustryForProducts, setSelectedIndustryForProducts] = useState('');

    // BuyModal state
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Update localStorage when state changes
    useEffect(() => {
        localStorage.setItem(`selectedBrand_${currentIndustry}`, selectedBrand);
    }, [selectedBrand, currentIndustry]);
    useEffect(() => {
        localStorage.setItem('currentIndustry', currentIndustry);
    }, [currentIndustry]);
    useEffect(() => {
        localStorage.setItem(`searchTerm_${currentIndustry}`, currentSearchTerm);
    }, [currentSearchTerm, currentIndustry]);

    // Update state when props change, only if valid
    useEffect(() => {
        if (validIndustries.includes(industry)) {
            setCurrentIndustry(industry);
            setSelectedBrand('');
        }
        setCurrentSearchTerm(searchTerm || '');
    }, [industry, searchTerm]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Sample product data for all industries
    const productsData = {
        Chocolate: {
            name: "Chocolate Products",
            brands: ["Cadbury", "Lindt", "Ferrero Rocher", "Hershey's", "Godiva", "Toblerone"],
            products: [
                { id: 1, name: "Dark Chocolate Bar", brand: "dark", price: "₹150-250 per 100g", image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Green_and_Black%27s_dark_chocolate_bar_2.jpg" },
                { id: 2, name: "Milk Chocolate", brand: "milk", price: "₹100-200 per 100g", image: "https://vaya.in/recipes/wp-content/uploads/2018/02/Milk-Chocolate-1.jpg" },
                { id: 3, name: "White Chocolate", brand: "white", price: "₹120-220 per 100g", image: "https://5.imimg.com/data5/BY/HU/VD/SELLER-87899356/white-chocolate.jpg" },
                { id: 4, name: "Filled Truffles", brand: "filled", price: "₹200-350 per 100g", image: "https://www.queensleeappetit.com/wp-content/uploads/2017/08/Decadent-Nutella-Truffles-on-queensleeappetit.com-2.jpg" },
                { id: 5, name: "Nutty Chocolate Bar", brand: "bar", price: "₹180-280 per 100g", image: "https://static.vecteezy.com/system/resources/previews/047/902/444/large_2x/gourmet-nutty-chocolate-bar-stack-photo.jpg" },
                { id: 6, name: "70% Dark Cocoa", brand: "dark", price: "₹170-270 per 100g", image: "https://jindalcocoa.com/cdn/shop/files/DarkChocolateClassic_d43f0e02-bb10-4276-a95e-f704f6c1a6f6.jpg?v=1742475843" },
                { id: 7, name: "Creamy Milk Chocolate", brand: "milk", price: "₹110-210 per 100g", image: "https://static.vecteezy.com/system/resources/previews/044/243/769/non_2x/a-milk-chocolate-bar-with-segmented-squares-ready-to-eat-free-png.png" },
                { id: 8, name: "Vanilla White Chocolate", brand: "white", price: "₹130-230 per 100g", image: "https://www.alphafoodie.com/wp-content/uploads/2020/06/white-chocolate-bar-square.jpeg" },
                { id: 9, name: "Caramel Filled", brand: "filled", price: "₹220-370 per 100g", image: "https://chocobai.in/wp-content/uploads/2024/10/caramel-chocolate.png" },
                { id: 10, name: "Almond Bar", brand: "bar", price: "₹190-290 per 100g", image: "https://mojo.generalmills.com/api/public/content/6Af2x9kUXka-m1983ykI4w_gmi_hi_res_jpeg.jpeg?v=6df8b170&t=466b54bb264e48b199fc8e83ef1136b4" },
                { id: 11, name: "Hazelnut Chocolate", brand: "milk", price: "₹180-280 per 100g", image: "https://5.imimg.com/data5/SELLER/Default/2025/5/511905376/SU/HS/WP/189132282/milk-chocolate-hazelnut-500x500.jpg" },
                { id: 12, name: "Orange Dark Chocolate", brand: "dark", price: "₹200-320 per 100g", image: "https://www.cheerschocolates.com/cdn/shop/files/11.2.png?v=1688192296&width=1445" },
                { id: 13, name: "Cookies & Cream", brand: "white", price: "₹160-260 per 100g", image: "https://5.imimg.com/data5/MN/YF/KO/SELLER-2706786/cookies-cream-flavour-500x500.jpg" },
                { id: 14, name: "Mint Chocolate", brand: "dark", price: "₹190-300 per 100g", image: "https://5.imimg.com/data5/OC/GP/MY-22671006/mint-chocolate-500x500.jpg" },
                { id: 15, name: "Fruit & Nut Bar", brand: "milk", price: "₹170-270 per 100g", image: "https://www.shantis.com/images/prod/fruit-and-nut-bars/banner.webp" },
                { id: 16, name: "Ruby Chocolate", brand: "ruby", price: "₹250-400 per 100g", image: "https://images.squarespace-cdn.com/content/v1/613a355a1825c65d1f0a6a8a/6a3370ea-6247-4f29-8434-aa305d97d5df/Ruby+Chocolate.jpeg" },
                { id: 17, name: "Sea Salt Caramel", brand: "dark", price: "₹210-330 per 100g", image: "https://rms-media-prod.generalmills.com/66df98db-bb46-42fb-a2b6-057cf44e94bd.jpg" },
                { id: 18, name: "Coffee Chocolate", brand: "milk", price: "₹180-290 per 100g", image: "https://4.imimg.com/data4/CN/JR/MY-27476035/coffee-chocolate-500x500.jpg" },
                { id: 19, name: "Coconut Chocolate", brand: "white", price: "₹170-280 per 100g", image: "https://prettysimplesweet.com/wp-content/uploads/2016/05/WhiteChocolateCoconutTruffles_03.jpg" },
                { id: 20, name: "Peanut Butter Cups", brand: "filled", price: "₹220-350 per 150g", image: "https://realfood.tesco.com/media/images/1400x919-Tesco-BigHealthyRecipeFinderTool-19201-HomemadeHealthyPeanutButterCups-c553c647-e8fb-47c4-bbc9-5143c0d2ef11-0-1400x919.jpg" }      
            ]
        },
        Rice: {
  name: "Rice Products",
  brands: ["Basmati", "Non-Basmati"],
  products: [
    { id: 101, name: "1121 Basmati Rice", brand: "Basmati", price: "$12.99 per kg", image: "/img/1121_Steam_Basamati.jpg" },
    { id: 102, name: "1509 Grain Basmati", brand: "Basmati", price: "$10.99 per kg", image: "/img/1509_steam_Basamati.jpg" },
    { id: 103, name: "1401 Basmati Rice", brand: "Basmati", price: "$14.99 per kg", image: "/img/1401_Steam_Basamati.jpg" },
    { id: 104, name: "Pusa Basmati", brand: "Basmati", price: "$16.99 per kg", image: "/img/Pusa_Basmati.jpg" },
    { id: 105, name: "Traditional Basmati Rice", brand: "Basmati", price: "$16.99 per kg", image: "/img/Traditional_Basmati.jpg" },
    { id: 106, name: "1718 Basmati Rice", brand: "Basmati", price: "$16.99 per kg", image: "/img/1718_Steam_Basamati.jpg" },
    { id: 107, name: "1885 Basmati Rice", brand: "Basmati", price: "$16.99 per kg", image: "/img/1885_Basmati.jpg" },
    { id: 201, name: "Sona Masoori (Non-Basmati) Rice", brand: "Non-Basmati", price: "$8.99 per kg", image: "/img/Sona_Masoori_rice.jpg" },
    { id: 202, name: "Sugandha (Non-Basmati)", brand: "Non-Basmati", price: "$7.99 per kg", image: "/img/Sugandha_rice.jpg" },
    { id: 203, name: "RH-10 (Non-Basmati) Rice", brand: "Non-Basmati", price: "$9.99 per kg", image: "/img/Rh-10_rice.jpg" },
    { id: 204, name: "PR-11/14 (Non-Basmati) Rice", brand: "Non-Basmati", price: "$6.99 per kg", image: "/img/pr-11-14-rice.jpg" },
    { id: 205, name: "PR-06/47 (Non-Basmati) Rice", brand: "Non-Basmati", price: "$8.99 per kg", image: "/img/pr_06-47_rice.jpg" },
    { id: 206, name: "Long Grain (Non-Basmati) Rice", brand: "Non-Basmati", price: "$9.99 per kg", image: "/img/Long_Grain_rice.jpg" },
    { id: 207, name: "IR-8 (Non-Basmati) Rice", brand: "Non-Basmati", price: "$6.99 per kg", image: "/img/Ir-8_rice.jpg" },
    { id: 208, name: "GR-11 (Non-Basmati) Rice", brand: "Non-Basmati", price: "$8.99 per kg", image: "/img/Gr-11_rice.jpg" },
    { id: 209, name: "Swarna (Non-Basmati) Rice", brand: "Non-Basmati", price: "$7.99 per kg", image: "/img/swarna_rice.jpg" },
    { id: 210, name: "Kalizeera (Non-Basmati) Rice", brand: "Non-Basmati", price: "$9.99 per kg", image: "/img/Kalizeera_rice.jpg" },
    { id: 211, name: "Ponni Rice (Non-Basmati) Rice", brand: "Non-Basmati", price: "$6.99 per kg", image: "/img/Ponni_rice.jpg" }
  ]
},
        Perfumes: {
            name: "Perfume Collections",
            brands: ["Chanel", "Dior", "Gucci", "Versace", "Calvin Klein", "Tom Ford"],
            products: [
                  { id: 1, name: "Rose Floral Perfume", brand: "floral", price: "₹1,500-3,000 per 50ml", image: "https://thursd.com/storage/media/60906/floral-fragrance-from-the-pink-roses-of-Grasse.jpg" },
    { id: 2, name: "Amber Oriental", brand: "oriental", price: "₹2,000-4,000 per 50ml", image: "https://www.ahmedalmaghribi.co.in/wp-content/uploads/2025/08/What-Is-Oriental-Fragrance-and-Why-Is-It-Getting-So-Popular-in-India.jpg" },
    { id: 3, name: "Sandalwood Woody", brand: "woody", price: "₹1,800-3,500 per 50ml", image: "https://5.imimg.com/data5/SELLER/Default/2024/8/446695714/KP/SH/XB/144783504/sandal-water-500x500.jpg" },
    { id: 4, name: "Ocean Fresh", brand: "fresh", price: "₹1,200-2,500 per 50ml", image: "https://images-cdn.ubuy.co.in/659c5f27b7d22a787957a56a-rayhaan-fresh-wave-for-men-eau-de-parfum.jpg" },
    { id: 5, name: "Lemon Citrus", brand: "citrus", price: "₹1,000-2,000 per 50ml", image: "https://m.media-amazon.com/images/I/51codlt3tOL._UF350,350_QL80_.jpg" },
    { id: 6, name: "Lavender Floral", brand: "floral", price: "₹1,600-3,200 per 50ml", image: "https://static.vecteezy.com/system/resources/thumbnails/059/969/352/small_2x/lavender-perfume-bottle-exquisite-fragrance-in-a-glass-bottle-photo.jpeg" },
    { id: 7, name: "Vanilla Oriental", brand: "oriental", price: "₹2,200-4,500 per 50ml", image: "https://5.imimg.com/data5/SELLER/Default/2024/12/470538454/AP/YD/VC/153313878/vanilla-caramel-fragrance-perfume-oil-for-scented-candles-500x500.png" },
    { id: 8, name: "Cedar Woody", brand: "woody", price: "₹2,000-4,000 per 50ml", image: "https://colabonature.com/wp-content/uploads/2021/09/25_COLLABO-CITRUS-1500.jpg" },
    { id: 9, name: "Mint Fresh", brand: "fresh", price: "₹1,400-2,800 per 50ml", image: "https://img-lcwaikiki.mncdn.com/mnpadding/1020/1360/ffffff/pim/productimages/20202/6231496/v1/l_20202-s34038z8-m0t_a.jpg" },
    { id: 10, name: "Grapefruit Citrus", brand: "citrus", price: "₹1,300-2,600 per 50ml", image: "https://www.vinevida.com/cdn/shop/articles/best-citrus-perfume-recipes.webp?v=1749118508" },
    
    // 10 More Perfume Products
    { id: 11, name: "Jasmine Night Perfume", brand: "floral", price: "₹1,800-3,500 per 50ml", image: "https://rukminim2.flixcart.com/image/480/480/kv9urgw0/perfume/n/v/g/50-indian-night-jasmine-eau-de-toilette-50-ml-eau-de-toilette-original-imag86w29j8hzwgt.jpeg?q=90" },
    { id: 12, name: "Musk Oud Luxury", brand: "oriental", price: "₹3,500-7,000 per 50ml", image: "https://www.houseofem5.com/cdn/shop/files/OudMusk-742510_1024x.jpg?v=1727090100" },
    { id: 13, name: "Pine Forest Scent", brand: "woody", price: "₹2,200-4,200 per 50ml", image: "https://images.squarespace-cdn.com/content/v1/677d732a89f175730ba34fab/1736283482495-9F8RGQ3QXGP8W3BOCJRW/20230613_152251.jpg" },
    { id: 14, name: "Sea Breeze Fresh", brand: "fresh", price: "₹1,500-2,800 per 50ml", image: "https://www.indicinspirations.com/cdn/shop/products/sea-breeze-fragrance-fragrances-461455.jpg?v=1659387226&width=899" },
    { id: 15, name: "Orange Zest Cologne", brand: "citrus", price: "₹1,200-2,400 per 50ml", image: "https://hips.hearstapps.com/hmg-prod/images/citrus-perfumes-6633e41ad3543.png?crop=1.00xw:0.668xh;0,0.332xh&resize=640:*" },
    { id: 16, name: "Rose & Oud Blend", brand: "floral", price: "₹2,500-5,000 per 50ml", image: "https://m.media-amazon.com/images/I/518vGLpm82L._SY780_.jpg" },
    // { id: 17, name: "Spicy Cinnamon", brand: "oriental", price: "₹1,800-3,600 per 50ml", image: "https://cdn.shopify.com/s/files/1/0267/4223/9077/products/spicy-cinnamon-perfume_1200x1200.jpg?v=1582277895" },
    { id: 18, name: "Teak Wood Essence", brand: "woody", price: "₹2,800-5,500 per 50ml", image: "https://fimgs.net/mdimg/perfume/o.45339.jpg" },
    { id: 19, name: "Rainforest Mist", brand: "fresh", price: "₹1,600-3,000 per 50ml", image: "https://reedsms.com/cdn/shop/files/Rainforest_Mist_Cologne_4_1400x.jpg?v=1739489218" },
    { id: 20, name: "Lemon Grass Fresh", brand: "citrus", price: "₹1,100-2,200 per 50ml", image: "https://www.rosemoore.co.in/cdn/shop/files/Lemongrass_air_freshener_large.png?v=1719213282" }
            ]
        },
        Clothes: {
            name: "Fashion Collection",
            brands: ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Tommy Hilfiger"],
            products: [
             { id: 1, name: "Men's T-Shirt", brand: "men", price: "₹500-1,000", image: "https://triprindia.com/cdn/shop/files/3.1_e5dffbdb-a071-4248-a973-fd919300796e.jpg?v=1758184028&width=1200" },
    { id: 2, name: "Women's Dress", brand: "women", price: "₹1,000-3,000", image: "https://m.media-amazon.com/images/I/71ieNH8gUeL._UY1100_.jpg" },
    { id: 3, name: "Kids Jacket", brand: "kids", price: "₹800-1,500", image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/3/zB2rQcnU_954c56dec2ee4a15a3f5b58e19c6e9a9.jpg" },
    { id: 4, name: "Sport Leggings", brand: "sport", price: "₹1,200-2,500", image: "https://rukminim2.flixcart.com/image/368/490/xif0q/tight/p/a/z/xxl-af-01-cosvos-original-imah7syp4thgjxsz.jpeg?q=90&crop=false" },
    { id: 5, name: "Formal Suit", brand: "formal", price: "₹5,000-10,000", image: "https://blackberrys.com/cdn/shop/files/Two_Piece_Grey_Textured_Formal_Suits_Pax-CP002080G1-image1_1600x.jpg?v=1722582207" },
    { id: 6, name: "Men's Jeans", brand: "men", price: "₹1,000-2,500", image: "https://www.cernucci.com/cdn/shop/files/VG-DBAGGY01_1.jpg?v=1709654866&width=800" },
    { id: 7, name: "Women's Blouse", brand: "women", price: "₹800-2,000", image: "https://jisboutique.com/cdn/shop/files/29_c6f66fb8-7587-4cf4-bb02-72aab6d7eaeb.jpg?v=1728883575" },
    { id: 8, name: "Kids Shoes", brand: "kids", price: "₹600-1,200", image: "https://thelittlebunny.in/cdn/shop/files/WhatsAppImage2024-09-05at11.26.10.jpg?v=1725515814" },
    { id: 9, name: "Sport Jacket", brand: "sport", price: "₹1,500-3,000", image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28851164/2024/9/25/27ecf00a-1573-4e6e-ba34-59dcb9fba62e1727236369123-HRX-by-Hrithik-Roshan-Men-Jackets-9841727236368488-1.jpg" },
    { id: 10, name: "Formal Shirt", brand: "formal", price: "₹1,000-2,500", image: "https://www.beyoung.in/api/cache/catalog/products/shirt_squre_image_update_14_3_2022/sky_blue_cotton_solid_shirts_for_men_base_02_05_2024_700x933.jpg" },
    
    // 10 More Clothing Products
    { id: 11, name: "Men's Casual Shirt", brand: "men", price: "₹800-1,800", image: "https://images.meesho.com/images/products/410068630/nbgzn_512.webp?width=512" },
    { id: 12, name: "Women's Kurti", brand: "women", price: "₹600-1,500", image: "https://www.ethnicrajasthan.com/cdn/shop/files/APKULCCSPPLFL39901ER00M_4.jpg?v=1729935271&width=2048" },
    { id: 13, name: "Kids T-Shirt Pack", brand: "kids", price: "₹400-900", image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/11/Yyr5baXx_bcc6582847224ff9a63e92a662bca40a.jpg" },
    { id: 14, name: "Running Shoes", brand: "sport", price: "₹1,800-4,000", image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/30577225/2025/2/5/a19c0276-3672-47cd-82a7-81ad6f8f22fb1738761642840-Puma-Unisex-Conduct-Pro-Running-Shoes-8321738761642558-1.jpg" },
    { id: 15, name: "Formal Trousers", brand: "formal", price: "₹1,200-2,800", image: "https://kaapus.com/cdn/shop/files/4R9A1394.jpg?v=1742218502" },
    { id: 16, name: "Men's Hoodie", brand: "men", price: "₹900-2,000", image: "https://images.meesho.com/images/products/350849663/wt2pk_512.webp?width=512" },
    { id: 17, name: "Women's Leggings", brand: "women", price: "₹400-1,000", image: "https://m.media-amazon.com/images/I/81OiLpZAVGL._UY1100_.jpg" },
    { id: 18, name: "Kids Winter Jacket", brand: "kids", price: "₹1,200-2,500", image: "https://m.media-amazon.com/images/I/51cSYQ426wL._UY1100_.jpg" },
    { id: 19, name: "Yoga Pants", brand: "sport", price: "₹800-1,800", image: "https://contents.mediadecathlon.com/p2730435/c21bdd8b5969f594358236158e02e94f/p2730435.jpg" },
    { id: 20, name: "Blazer Jacket", brand: "formal", price: "₹2,500-6,000", image: "https://m.media-amazon.com/images/I/61BMEP6zinL._UY1100_.jpg" }
            ]
        },
        Electronics: {
            name: "Electronics & Gadgets",
            brands: ["Apple", "Samsung", "Sony", "LG", "Dell", "HP"],
            products: [
                { id: 1, name: "iPhone 15", brand: "Apple", price: "$999.00", image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg" },
                { id: 2, name: "Galaxy S24", brand: "Samsung", price: "$899.00", image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/Samsung-galaxy-s24-5g-marble-grey-128gb-8gb-ram-Front-Back-View.png" },
                { id: 3, name: "PlayStation 5", brand: "Sony", price: "$499.00", image: "https://rukminim2.flixcart.com/image/480/640/xif0q/gamingconsole/5/n/u/-original-imaghyykrhvewh4y.jpeg?q=90" },
                { id: 4, name: "OLED TV", brand: "LG", price: "$1299.00", image: "https://cdn11.bigcommerce.com/s-8ek7z3h3jn/images/stencil/1280x1280/products/7933/35908/lg-a2-55-inch-4k-smart-oled-tv-or-oled55a26la__19261.1664570856.jpg?c=1?imbypass=on" },
                { id: 5, name: "Laptop", brand: "Dell", price: "$799.00", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g15-5530/media-gallery/gray/non-touch/4-zone-rgb-kb/notebook-laptop-g15-5530-gray-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1107&qlt=100,1&resMode=sharp2&size=1107,804&chrss=full" },
                { id: 6, name: "Printer", brand: "HP", price: "$299.00", image: "https://www.jiomart.com/images/product/original/493664592/hp-smart-tank-585-ink-tank-multi-function-colour-wifi-printer-digital-o493664592-p596333554-8-202406121855.jpeg?im=Resize=(420,420)" }
            ]
        },
        Fruits: {
            name: "Fresh Fruits",
            brands: ["Del Monte", "Dole", "Chiquita", "Sunkist", "Wonderful", "Ocean Spray"],
            products: [
                { id: 1, name: "Fresh Apples", brand: "Del Monte", price: "$3.99", image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg" },
                { id: 2, name: "Bananas", brand: "Dole", price: "$1.99", image: "https://www.millerchemical.com/wp-content/uploads/2021/03/iStock-1184345169.png" },
                { id: 3, name: "Oranges", brand: "Sunkist", price: "$4.99", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/250px-Ambersweet_oranges.jpg" },
                { id: 4, name: "Grapes", brand: "Wonderful", price: "$5.99", image: "https://extension.psu.edu/media/catalog/product/5/9/598fa4dc3131dff06c11acffafcc0e6a.jpeg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:" },
                { id: 5, name: "Berries", brand: "Dole", price: "$6.99", image: "https://horticulture.co.uk/wp-content/uploads/2021/11/berryvarieties-header.jpg" },
                { id: 6, name: "Tropical Mix", brand: "Chiquita", price: "$7.99", image: "https://m.media-amazon.com/images/I/81KRQH38fLL.jpg" }
            ]
        },
        Vegetables: {
            name: "Fresh Vegetables",
            brands: ["Green Giant", "Fresh Express", "Earthbound", "Mann's", "Grimmway", "Bunny"],
            products: [
                { id: 1, name: "Carrots", brand: "Grimmway", price: "$2.99", image: "https://bcfresh.ca/wp-content/uploads/2021/11/Carrots.jpg" },
                { id: 2, name: "Broccoli", brand: "Green Giant", price: "$3.49", image: "https://t4.ftcdn.net/jpg/01/38/59/65/360_F_138596528_dG7J8xrEXROzGkE0PCgKjDWyclYUWfzz.jpg" },
                { id: 3, name: "Spinach", brand: "Fresh Express", price: "$2.79", image: "https://www.onlin.in/public/images/DailyDrop/products/67739aaa6f9f6-6773a37e89445.jpg" },
                { id: 4, name: "Bell Peppers", brand: "Mann's", price: "$4.99", image: "https://chef-gourmet.net/wp-content/uploads/2022/01/BellPeppers-scaled-e1641949331299-1.jpg" },
                { id: 5, name: "Potatoes", brand: "Earthbound", price: "$3.99", image: "https://flaviafoods.com/wp-content/uploads/2025/06/41QKCkQ2A5L._UF8941000_QL80_.jpg" },
                { id: 6, name: "Lettuce", brand: "Bunny", price: "$1.99", image: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg" }
            ]
        },
        Spices: {
    name: "Spices Collection",
    brands: [
        "cumin", "turmeric", "pepper", "cinnamon", "clove", "coriander",
        "mustard", "methi", "fennel", "bayleaf", "ajwain", "curry",
        "mint", "chilli", "cardamom", "nutmeg", "mace", "anise",
        "saffron", "poppy", "salt", "tamarind", "mango", "garlic",
        "onion", "ginger", "asafoetida"
    ],
    products: [
        { id: 1, name: "Ground Cumin", brand: "cumin", price: "₹20.0-30.0 per 100g", image: "https://trupti.ca/cdn/shop/products/shutterstock_752658160_31781237-e366-4fd0-974b-195e4601c214_1200x1200.jpg?v=1600472387" },
        { id: 2, name: "Turmeric Powder", brand: "turmeric", price: "₹15.0-25.0 per 100g", image: "https://m.media-amazon.com/images/I/51MV9JUTOIL._UF1000,1000_QL80_.jpg" },
        { id: 3, name: "Black Pepper", brand: "pepper", price: "₹30.0-40.0 per 100g", image: "https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/coorg-black-pepper-powder-coorg-spices-shop-online.20240714001931.webp" },
        { id: 4, name: "Cinnamon Sticks", brand: "cinnamon", price: "₹40.0-60.0 per 100g", image: "https://m.media-amazon.com/images/I/51+hwFap-TL._UF1000,1000_QL80_.jpg" },
        { id: 5, name: "Whole Cloves", brand: "clove", price: "₹50.0-70.0 per 100g", image: "https://thewholesaler.in/cdn/shop/products/Clove-Powder-Laung-Syzygium-aromaticum-TheWholesalerCo-35822554.jpg" },
        { id: 6, name: "Cumin Seeds", brand: "cumin", price: "₹18.0-28.0 per 100g", image: "https://m.media-amazon.com/images/I/81Fx1lQ-xoL._UF350,350_QL80_.jpg" },
        { id: 7, name: "Organic Turmeric", brand: "turmeric", price: "₹20.0-30.0 per 100g", image: "https://www.viralspices.com/wp-content/uploads/2024/11/Untitled-1-624x312.jpg" },
        { id: 8, name: "White Pepper", brand: "pepper", price: "₹35.0-45.0 per 100g", image: "https://www.urbangroc.com/wp-content/uploads/2021/05/White-Pepper-Powder.jpg" },
        { id: 9, name: "Ground Cinnamon", brand: "cinnamon", price: "₹45.0-65.0 per 100g", image: "https://www.natureloc.com/image/cache/catalog/New%202022/cinnamon-powder-768x576-600x600.jpg" },
        { id: 10, name: "Clove Powder", brand: "clove", price: "₹55.0-75.0 per 100g", image: "https://m.media-amazon.com/images/I/41C09azNovL._UF894,1000_QL80_.jpg" },
        { id: 11, name: "Coriander Seeds", brand: "coriander", price: "₹15.0-20.0 per 100g", image: "https://cdn2.stylecraze.com/wp-content/uploads/2013/05/7-Impressive-Benefits-Of-Coriander-Seeds-Boost-Heart-Health-Treat-Diabetes-And-More-jpg.jpg" },
        { id: 12, name: "Coriander Powder", brand: "coriander", price: "₹16.0-22.0 per 100g", image: "https://zamaorganics.com/cdn/shop/files/Untitled_design_27.jpg?v=1756906562&width=1080" },
        { id: 13, name: "Mustard Seeds", brand: "mustard", price: "₹12.0-18.0 per 100g", image: "https://img.thecdn.in/394829/MustardSeed_329c2107-12f1-4924-b1cd-8ba6a48c8dce-1725505801053.jpeg?width=600&format=webp" },
        { id: 14, name: "Fenugreek Seeds (Methi)", brand: "methi", price: "₹10.0-15.0 per 100g", image: "https://m.media-amazon.com/images/I/61Sag570CCL._UF1000,1000_QL80_.jpg" },
        { id: 15, name: "Fennel Seeds (Saunf)", brand: "fennel", price: "₹20.0-30.0 per 100g", image: "https://starindojapan.com/wp-content/uploads/2020/01/Fennel-Seeds-100-gm-Lucknowi-Saunf.png" },
        { id: 16, name: "Bay Leaves", brand: "bayleaf", price: "₹25.0-35.0 per 100g", image: "https://m.media-amazon.com/images/I/41YVB2S1R7L._UF1000,1000_QL80_.jpg" },
        { id: 17, name: "Carom Seeds (Ajwain)", brand: "ajwain", price: "₹18.0-25.0 per 100g", image: "https://m.media-amazon.com/images/I/51Sm64oJ1JL._UF1000,1000_QL80_.jpg" },
        { id: 18, name: "Black Mustard Seeds", brand: "mustard", price: "₹13.0-20.0 per 100g", image: "https://5.imimg.com/data5/KF/YK/MY-5665983/black-mustard-seeds.jpg" },
        { id: 19, name: "Dry Curry Leaves", brand: "curry", price: "₹30.0-40.0 per 100g", image: "https://5.imimg.com/data5/SELLER/Default/2024/2/394397219/UL/FW/VU/19056109/71ztvsmkqzs-ac-uf1000-1000-ql80-500x500.jpg" },
        { id: 20, name: "Kasuri Methi (Dried Fenugreek Leaves)", brand: "methi", price: "₹40.0-60.0 per 100g", image: "https://elephantrunk.in/cdn/shop/products/KASTOORI-METHI-Dried-Fenugreek-leaves_dc23dbe9-85f1-4eef-9667-9ad4947da846.jpg?v=1713516636" },
        { id: 21, name: "Dry Mint Leaves", brand: "mint", price: "₹30.0-45.0 per 100g", image: "https://5.imimg.com/data5/TP/VR/DT/ANDROID-56903532/product-jpeg-500x500.jpeg" },
        { id: 22, name: "Red Chilli Powder", brand: "chilli", price: "₹25.0-35.0 per 100g", image: "https://flourworks.in/wp-content/uploads/2023/07/RedChilliBoth-03_1500x.webp" },
        { id: 23, name: "Dried Red Chillies", brand: "chilli", price: "₹22.0-30.0 per 100g", image: "https://m.media-amazon.com/images/I/61zXH1Zp-TL._UF1000,1000_QL80_.jpg" },
        { id: 24, name: "Cardamom (Green Elaichi)", brand: "cardamom", price: "₹160.0-200.0 per 100g", image: "https://m.media-amazon.com/images/I/51E+TDU4ZwL._UF894,1000_QL80_.jpg" },
        { id: 25, name: "Cardamom Powder", brand: "cardamom", price: "₹170.0-210.0 per 100g", image: "https://rukminim2.flixcart.com/image/480/640/kusph8w0/spice-masala/w/b/o/10-cardamom-powder-elaichi-powder-10-g-1-pouch-chatokde-powder-original-imag7ucfe23n2phb.jpeg?q=90" },
        { id: 26, name: "Nutmeg (Jaiphal)", brand: "nutmeg", price: "₹80.0-100.0 per 100g", image: "https://satvyk.com/cdn/shop/files/Nutmeg.png?v=1745320517" },
        { id: 27, name: "Mace (Javitri)", brand: "mace", price: "₹100.0-130.0 per 100g", image: "https://5.imimg.com/data5/JX/AF/MY-44987491/mace-javitri-500x500.jpg" },
        { id: 28, name: "Star Anise", brand: "anise", price: "₹90.0-120.0 per 100g", image: "https://media.istockphoto.com/id/1284000191/photo/star-anise-in-a-wooden-bowl-on-the-table.jpg?s=612x612&w=0&k=20&c=WOIlDlSg7NS7SnU-stEbj8KSoz26zD0ixgM6auZer4Q=" },
        { id: 29, name: "Black Cardamom (Badi Elaichi)", brand: "cardamom", price: "₹80.0-100.0 per 100g", image: "https://5.imimg.com/data5/SELLER/Default/2023/6/319583908/VI/ID/KH/182306611/black-cardamom-badi-elaichi-1kg-500x500.png" },
        { id: 30, name: "Saffron (Kesar)", brand: "saffron", price: "₹200.0-300.0 per g", image: "https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/premium-kashmiri-saffron-1g-100-pure-grade-1-kesar-from.20240409012247.webp" },
        { id: 31, name: "Black Cumin (Shahi Jeera)", brand: "cumin", price: "₹50.0-70.0 per 100g", image: "https://m.media-amazon.com/images/I/516B1BwcoVL._UF894,1000_QL80_.jpg" },
        { id: 32, name: "Poppy Seeds (Khus Khus)", brand: "poppy", price: "₹150.0-180.0 per 100g", image: "https://elephantrunk.in/cdn/shop/products/POPPY-SEED_cbd60877-73d7-4a52-83f9-a84d6bf28ef3.jpg?v=1713516730" },
        { id: 33, name: "Rock Salt (Sendha Namak)", brand: "salt", price: "₹6.0-10.0 per 100g", image: "https://5.imimg.com/data5/WU/IO/MY-5087242/premium-quality-sendha-namak-500x500.jpg" },
        { id: 34, name: "Black Salt (Kala Namak)", brand: "salt", price: "₹7.0-12.0 per 100g", image: "https://www.prodottidisano.it/wp-content/uploads/2020/06/Sale-nero-Hawaii-1.jpg" },
        { id: 35, name: "Tamarind (Imli)", brand: "tamarind", price: "₹15.0-22.0 per 100g", image: "https://weaveskart.com/wp-content/uploads/2023/05/Finest-quality-of-Fresh-_-Organically-grown-Tamarind-Imli-2-1.jpg" },
        { id: 36, name: "Dry Mango Powder (Amchur)", brand: "mango", price: "₹40.0-55.0 per 100g", image: "https://m.media-amazon.com/images/I/61vnBhUQOxL.jpg" },
        { id: 37, name: "Garlic Powder", brand: "garlic", price: "₹30.0-40.0 per 100g", image: "https://dailyfarmer.in/cdn/shop/articles/SEOon_garlic-powder-cloves-feature_25ab90b2-f5c4-4346-b10c-26af5ef5d51f.jpg?v=1744262375" },
        { id: 38, name: "Onion Powder", brand: "onion", price: "₹25.0-35.0 per 100g", image: "https://m.media-amazon.com/images/I/61S8+Dta88L._UF1000,1000_QL80_.jpg" },
        { id: 39, name: "Dry Ginger Powder", brand: "ginger", price: "₹25.0-35.0 per 100g", image: "https://m.media-amazon.com/images/I/613gdZIEm2L._UF894,1000_QL80_.jpg" },
        { id: 40, name: "Asafoetida (Hing)", brand: "asafoetida", price: "₹150.0-200.0 per 100g", image: "https://www.simhas.in/image/cache/catalog/products/asafoetida/_DSC0194-647x400.png" }
    ]
},
        Pulses: {
            name: "Pulses & Lentils",
            brands: ["dal", "whole"],
            products: [
                { id: 1, name: "Toor Dal (Arhar Dal)", brand: "dal", price: "₹120-140 per kg", image: "https://chakkiwalle.com/cdn/shop/files/1588344248_toor-dal.jpg?v=1708599736" },
                { id: 2, name: "Moong Dal", brand: "dal", price: "₹130-150 per kg", image: "https://vibrantliving.in/cdn/shop/files/MoongDalSplitSkinless.jpg?v=1731059585&width=2048" },
                { id: 3, name: "Chana Dal", brand: "dal", price: "₹110-130 per kg", image: "https://5.imimg.com/data5/OH/JO/JM/SELLER-9632007/chana-dal-500x500.jpg" },
                { id: 4, name: "Masoor Dal", brand: "dal", price: "₹100-120 per kg", image: "https://gonefarmers.com/cdn/shop/products/image_cc51f8bf-501f-4ae7-a546-3a579299ca9d_grande.jpg?v=1596652176" },
                { id: 5, name: "Urad Dal", brand: "dal", price: "₹140-160 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2023/5/307714999/OW/ZQ/ZW/163360758/urad-dal-500x500.jpg" },
                { id: 6, name: "Mixed Dal", brand: "dal", price: "₹125-145 per kg", image: "https://www.jiomart.com/images/product/original/491187301/good-life-dal-mix-1-kg-product-images-o491187301-p491187301-2-202203170748.jpg?im=Resize=(1000,1000)" },
                { id: 7, name: "Masoor Malka Dal (Red Lentils Split)", brand: "dal", price: "₹115-135 per kg", image: "https://www.nafedbazaar.com/wp-content/uploads/2021/03/Malka-Red-1kg-3-1.jpg" },
                { id: 8, name: "Green Gram Split (Moong Chilka)", brand: "dal", price: "₹125-145 per kg", image: "https://vibrantliving.in/cdn/shop/files/HeirloomPilliPesalu_MoongDalSplitwithSkin.png?v=1731059411&width=2048" },
                { id: 9, name: "Yellow Moong Dal (Polished)", brand: "dal", price: "₹130-150 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/402049066/GC/XH/UC/65875104/organic-yellow-moong-dal-500x500.jpg" },
                { id: 10, name: "Urad Chilka Dal (Split Black Gram)", brand: "dal", price: "₹130-150 per kg", image: "https://5.imimg.com/data5/ECOM/Default/2022/8/HI/FW/RE/18785016/urad-dal-chilka-605198-500x500.jpg" },
                { id: 11, name: "Chilka Toor Dal", brand: "dal", price: "₹125-145 per kg", image: "https://2.wlimg.com/product_images/bc-full/2024/5/12822418/watermark/urad-chilka-dal-1712659334-7376721.jpeg" },
                { id: 12, name: "Lobia Dal (Black Eyed Bean Split)", brand: "dal", price: "₹110-130 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2022/9/NY/HS/YP/101792284/black-eyes-lobia-beans-250x250.jpg" },
                { id: 13, name: "Horse Gram (Kulthi Dal)", brand: "dal", price: "₹90-110 per kg", image: "https://images-eu.ssl-images-amazon.com/images/I/81wYvs9mgkL._AC_UL210_SR210,210_.jpg" },
                { id: 14, name: "Peas Dal (Matar Dal)", brand: "dal", price: "₹95-115 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2023/9/341718376/JB/TJ/WU/11683143/organic-toor-dal-1-500x500.jpeg" },
                { id: 15, name: "Bengal Gram Dal (Desi Chana Dal)", brand: "dal", price: "₹120-140 per kg", image: "https://5.imimg.com/data5/NG/SF/MY-12683566/bengal-gram-dal.jpg" },
                { id: 16, name: "Black Masoor Dal", brand: "dal", price: "₹115-135 per kg", image: "https://5.imimg.com/data5/FA/EX/MY-13113171/pulses.jpg" },
                { id: 17, name: "Whole Moong", brand: "whole", price: "₹90-110 per kg", image: "https://m.media-amazon.com/images/I/51s0SMY-S-L._UF894,1000_QL80_.jpg" },
                { id: 18, name: "Whole Chana", brand: "whole", price: "₹80-100 per kg", image: "https://m.media-amazon.com/images/I/51jyhTCV3bS.jpg" },
                { id: 19, name: "Rajma (Kidney Beans)", brand: "whole", price: "₹150-170 per kg", image: "https://twobrothersindiashop.com/cdn/shop/articles/benefits-of-rajma.png?v=1691755459&width=1024" },
                { id: 20, name: "Kabuli Chana", brand: "whole", price: "₹120-140 per kg", image: "https://5.imimg.com/data5/RH/DH/MY-5114135/kabuli-chana.jpg" },
                { id: 21, name: "Matki (Moth Beans)", brand: "whole", price: "₹100-120 per kg", image: "https://www.greendna.in/cdn/shop/products/moth2_594x.jpg?v=1591178564" },
                { id: 22, name: "Green Moong", brand: "whole", price: "₹95-115 per kg", image: "https://i0.wp.com/uzhavuorganic.com/wp-content/uploads/2021/05/organic-gren-moong-dal.png?fit=300%2C260&ssl=1" },
                { id: 23, name: "Black Chana", brand: "whole", price: "₹85-105 per kg", image: "https://ayuvya.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fayuvya_images%2Fblog_image%2FGuide_On_Black_Chana_Protein_and_Nutrition_Value_You_Must_Explore.webp&w=1080&q=75" },
                { id: 24, name: "White Chana", brand: "whole", price: "₹75-95 per kg", image: "https://m.media-amazon.com/images/I/71t+BVVqEbL._UF894,1000_QL80_.jpg" },
                { id: 25, name: "Masoor Whole", brand: "whole", price: "₹85-105 per kg", image: "https://bajarhaat.com/wp-content/uploads/2024/06/Whole-Masoor-Dal.jpg" },
                { id: 26, name: "Green Peas Whole", brand: "whole", price: "₹80-100 per kg", image: "https://agtfoods.co.za/wp-content/uploads/2018/06/Whole-Green-Peas_600x600_1-1.jpg" },
                { id: 27, name: "Brown Chana Whole", brand: "whole", price: "₹85-105 per kg", image: "https://m.media-amazon.com/images/I/51phpmtYZcL._UF894,1000_QL80_.jpg" },
                { id: 28, name: "Lobia (Black Eyed Beans)", brand: "whole", price: "₹100-120 per kg", image: "https://m.media-amazon.com/images/I/51dx-mEiF2L._UF894,1000_QL80_.jpg" },
                { id: 29, name: "Moth Beans Whole (Matki)", brand: "whole", price: "₹95-115 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2021/5/SE/OM/SU/44009489/moth-bean-500x500.jpg" },
                { id: 30, name: "Kulthi Whole (Horse Gram)", brand: "whole", price: "₹90-110 per kg", image: "https://www.sirimart.in/wp-content/uploads/2020/09/Kulathi_Horsegram_Cowpea_Ulavalu_Huruli.jpg" },
                { id: 31, name: "Whole Urad (Black Gram Whole)", brand: "whole", price: "₹100-120 per kg", image: "https://5.imimg.com/data5/IE/HP/MY-53084573/black-gram-28black-urad-29.jpg" },
                { id: 32, name: "Whole Rajma Chitra", brand: "whole", price: "₹160-180 per kg", image: "https://m.media-amazon.com/images/I/41URkzMwZ6S._UF894,1000_QL80_.jpg" },
                { id: 33, name: "Whole Rajma Jammu", brand: "whole", price: "₹150-170 per kg", image: "https://biobasics.org/cdn/shop/files/buy-organic-jammu-rajma-online-at-bio-basics.png?v=1755700226" },
                { id: 34, name: "Whole Masoor Black", brand: "whole", price: "₹95-115 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/2/393847203/CJ/YJ/DG/202750922/organic-black-masoor-dal.jpeg" },
                { id: 35, name: "Whole Green Gram Desi", brand: "whole", price: "₹100-120 per kg", image: "https://5.imimg.com/data5/EU/CE/MY-6783187/moong-whole-28green-gram-29-500x500.png" },
                { id: 36, name: "Dry Peas White", brand: "whole", price: "₹85-105 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/12/476376995/DP/IG/UI/146632251/white-peas-dry-500x500.jpg" },
                { id: 37, name: "Dry Peas Yellow", brand: "whole", price: "₹90-110 per kg", image: "https://www.aivaproducts.com/cdn/shop/products/ProductImage1WholeDriedYellowPeas_Large_94aacf0d-9e24-483a-8e7c-78e510f13935_1024x1024.jpg?v=1634243383" },
                { id: 38, name: "Field Beans (Val)", brand: "whole", price: "₹110-130 per kg", image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/2/25/1/YW0210H_Baby-Lima-Beans_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1371614348577.webp" }
            ]
        },
        'Dry Fruits': {
            name: "Dry Fruits & Nuts",
            brands: ["Blue Diamond", "Wonderful", "Planters", "Kirkland", "Emerald", "Fisher"],
            products: [
              { id: 1, name: "Roasted Almonds", brand: "almond", price: "₹600-800 per kg", image: "https://www.onlinedelivery.in/images/detailed/27/7861.jpg" },
    { id: 2, name: "Cashew Nuts", brand: "cashew", price: "₹800-1,000 per kg", image: "https://kingnqueenz.com/cdn/shop/products/cashewnuts120orderonlinekingnqueenzkaju_grande.jpg?v=1669110881" },
    { id: 3, name: "Golden Raisins", brand: "raisin", price: "₹200-300 per kg", image: "https://5.imimg.com/data5/MP/FV/CZ/SELLER-106270270/golden-raisins-500x500.jpg" },
    { id: 4, name: "Walnut Kernels", brand: "walnut", price: "₹700-900 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/9/449874884/TK/KQ/FK/4364986/walnut-kernels-akhrot-giri-500x500.jpg" },
    { id: 5, name: "Pistachio Shelled", brand: "pistachio", price: "₹900-1,200 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2021/3/JL/AZ/MT/126015042/pista-500x500.jpg" },
    { id: 6, name: "Salted Almonds", brand: "almond", price: "₹650-850 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/4/412968065/QW/PG/TI/16351671/roasted-salted-almonds.jpg" },
    { id: 7, name: "Raw Cashews", brand: "cashew", price: "₹850-1,100 per kg", image: "https://5.imimg.com/data5/FD/EQ/MY-3724263/raw-cashew-nut-rcn.jpg" },
    { id: 8, name: "Black Raisins", brand: "raisin", price: "₹250-350 per kg", image: "https://trvcashews.com/shop/wp-content/uploads/2021/05/black-raisin-seedless.jpg" },
    { id: 9, name: "Whole Walnuts", brand: "walnut", price: "₹750-950 per kg", image: "https://m.media-amazon.com/images/I/41r2tNa17ZL._UF894,1000_QL80_.jpg" },
    { id: 10, name: "Roasted Pistachio", brand: "pistachio", price: "₹950-1,300 per kg", image: "https://images.squarespace-cdn.com/content/v1/52e887bee4b06b90fc8a7e3d/eacb4eab-800f-4dfe-b1f6-e9f9b6b7f129/How+to+Roast+Pistachios.jpg" },
    { id: 11, name: "Dried Figs (Anjeer)", brand: "fig", price: "₹700-900 per kg", image: "https://vibrantliving.in/cdn/shop/files/AnjeerDried.png?v=1731063809&width=2048" },
    { id: 12, name: "Dried Apricots", brand: "apricot", price: "₹600-800 per kg", image: "https://cdn.grofers.com/da/cms-assets/cms/product/8d8d7981-1054-42f3-9796-049f65354b73.jpg" },
    { id: 13, name: "Dried Dates (Khajur)", brand: "dates", price: "₹200-350 per kg", image: "https://cdn.shopaccino.com/edible-smart/products/dry-dates--khajoor-266650_l.jpg?v=608" },
    { id: 14, name: "Chilgoza Pine Nuts", brand: "pinenut", price: "₹2,000-2,800 per kg", image: "https://m.media-amazon.com/images/I/61cSqyS2bDL._UF350,350_QL80_.jpg" },
    { id: 15, name: "Hazelnuts", brand: "hazelnut", price: "₹1,200-1,500 per kg", image: "https://healthymaster.in/cdn/shop/products/e5_4685ac45-a122-4dc4-b506-c905f288f2ff.jpg?v=1753700767&width=1200" },
    { id: 16, name: "Brazil Nuts", brand: "brazilnut", price: "₹1,800-2,200 per kg", image: "https://images.squarespace-cdn.com/content/v1/5f0b42e3169cec7a4b742670/ca176168-de5c-4185-93b0-d0f3fbb06825/Brazil+Nuts1.jpg" },
    { id: 17, name: "Dried Cranberries", brand: "cranberry", price: "₹600-750 per kg", image: "https://meinaturals.in/wp-content/uploads/2024/12/Crane-Berry-Dried.webp" },
    { id: 18, name: "Dried Blueberries", brand: "blueberry", price: "₹1,000-1,300 per kg", image: "https://farmfreshfoods.in/wp-content/uploads/2025/06/10-2.webp" },
    { id: 19, name: "Dried Prunes", brand: "prune", price: "₹700-900 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2021/2/DC/UW/DF/121940085/prunes.jpg" },
    { id: 20, name: "Mixed Dry Fruit Gift Box", brand: "mix", price: "₹1,200-1,800 per kg", image: "https://rukminim2.flixcart.com/image/480/480/kr58yvk0/fmcg-combo/y/i/b/rawfruit-mix-dry-fruit-combo-pack-basic-dry-fruit-gift-pack-original-imag5yf8zefaetq9.jpeg?q=90" },
    { id: 21, name: "California Almonds", brand: "almond", price: "₹750-950 per kg", image: "https://5.imimg.com/data5/NW/ME/MY-64426243/91961f85-e99d-407c-a302-696c237630b1-500x500.jpg" },
    { id: 22, name: "Goa Cashew W320", brand: "cashew", price: "₹950-1,150 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/2/491471606/ND/QW/IG/237872562/w320-cashew-nut-500x500.jpg" },
    { id: 23, name: "Iranian Pistachio", brand: "pistachio", price: "₹1,200-1,600 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrNGa3ANKU-gzdZ7Zu0x-Iy3tFpO1r6m7og&s" },
    { id: 24, name: "Afghan Black Raisins", brand: "raisin", price: "₹300-400 per kg", image: "https://royalfantasy.in/cdn/shop/products/Afghan-Black-Raisins-Seedless-1-new.jpg?v=1630738504" },
    { id: 25, name: "Medjool Dates", brand: "dates", price: "₹800-1,200 per kg", image: "https://royalpalm-dates.com/wp-content/uploads/2021/06/m1.jpg" },
    { id: 26, name: "Salted Pistachio Mix", brand: "pistachio", price: "₹1,000-1,400 per kg", image: "https://www.ahlandates.com/cdn/shop/products/100812.png?v=1680860667" },
    { id: 27, name: "Dried Kiwi Slices", brand: "kiwi", price: "₹500-700 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2021/12/TI/DX/JO/41322576/dried-kiwi-slices-500x500.jpg" },
    { id: 28, name: "Dried Mango Slices", brand: "mango", price: "₹450-650 per kg", image: "https://keralaspicecart.com/wp-content/uploads/2021/06/dried-mango-slices-500x500-1.jpg" },
    { id: 29, name: "Dried Strawberry", brand: "strawberry", price: "₹900-1,200 per kg", image: "https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/premium-dried-strawberries.20241022014904.webp" },
    { id: 30, name: "Dry Fruit Mix for Sweets", brand: "mix", price: "₹1,000-1,400 per kg", image: "https://shreevaishnavisweets.com/cdn/shop/files/Shree-Vaishnavi-Sweets-and-Snacks-Dry-fruit-mixture_8b1c86e2-87eb-46b8-9585-4a98406a9de2.jpg?v=1736592104&width=1920" },
    { id: 31, name: "Macadamia Nuts", brand: "macadamia", price: "₹4,500-5,500 per kg", image: "https://valleymacs.co.za/wp-content/uploads/2024/09/4-768x768.jpg" },
    { id: 32, name: "Pumpkin Seeds", brand: "pumpkin", price: "₹800-1,100 per kg", image: "https://www.health.com/thmb/jA_Q7u2VMSnnPHfdYuZMqIPZLvk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-1175603836-3d537867024b4c438b06603ebe7e3227.jpg" },
    { id: 33, name: "Sunflower Seeds", brand: "sunflower", price: "₹400-600 per kg", image: "https://healthyroots.com/cdn/shop/products/Flushesskintoxin_1.png?v=1672382186" },
    { id: 34, name: "Chia Seeds", brand: "chia", price: "₹600-900 per kg", image: "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2021/11/chia_seeds_GettyImages1282395572_Thumb-732x549.jpg" },
    { id: 35, name: "Flax Seeds", brand: "flaxseed", price: "₹250-400 per kg", image: "https://files.nccih.nih.gov/flaxseed-steven-foster-square.jpg" },
    { id: 36, name: "Dried Mulberries", brand: "mulberry", price: "₹900-1,200 per kg", image: "https://4.imimg.com/data4/MB/KA/IOS-20585057/product-500x500.jpeg" },
    { id: 37, name: "Dried Pineapple Slices", brand: "pineapple", price: "₹600-800 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2022/10/JN/UG/JC/161206509/dried-pineapple-slice-500x500.jpg" },
    { id: 38, name: "Dried Papaya Cubes", brand: "papaya", price: "₹500-700 per kg", image: "https://www.goingnuts.in/wp-content/uploads/2023/03/PSX_20220207_133228-1-scaled-1.jpg" },
    { id: 39, name: "Dried Banana Chips", brand: "banana", price: "₹300-500 per kg", image: "https://thehappierhomemaker.com/wp-content/uploads/2018/02/banana-chips-featured.jpg" },
    { id: 40, name: "Dehydrated Coconut Slices", brand: "coconut", price: "₹400-600 per kg", image: "https://5.imimg.com/data5/XT/IM/CD/SELLER-11685563/coconut-dried-slice.jpg" },
    { id: 42, name: "Lotus Seeds (Makhana)", brand: "makhana", price: "₹500-750 per kg", image: "https://royalfantasy.in/cdn/shop/products/Lotus-Seed-Makhana-1.jpg?v=1627730567" },
    { id: 43, name: "Dried Coconut Flakes", brand: "coconut", price: "₹350-550 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/5/511765982/TT/WO/BV/35849660/dry-coconut-flakes-500x500.jpeg" },
    { id: 44, name: "Dried Black Currants", brand: "blackcurrant", price: "₹800-1,000 per kg", image: "https://m.media-amazon.com/images/I/71bfAi5iacL._UF350,350_QL80_.jpg" },
    { id: 45, name: "Dried Goji Berries", brand: "goji", price: "₹1,200-1,500 per kg", image: "https://ayoubs.ca/cdn/shop/articles/goji_berries_08474c9d-1f13-4ac6-a22b-37a8d2b24ca7_1024x1024.jpg?v=1751912972" },
    { id: 46, name: "Dried Plum (Aloo Bukhara)", brand: "plum", price: "₹600-850 per kg", image: "https://m.media-amazon.com/images/I/41ChMXc-u4S._UF894,1000_QL80_.jpg" },
    { id: 47, name: "Salted Mixed Nuts", brand: "mix", price: "₹1,200-1,500 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2022/12/JZ/SV/PD/30589520/roasted-salted-mixed-nuts.jpg" },
    { id: 48, name: "Premium Trail Mix", brand: "trailmix", price: "₹1,000-1,300 per kg", image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/trail-mix-snack-1296x728-header.jpeg?w=1155&h=1528" },
    { id: 49, name: "Dried Apple Rings", brand: "apple", price: "₹600-850 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2023/8/336643127/CP/NX/CX/92753237/dried-apple-rings-500x500.jpg" },
    { id: 50, name: "Dried Watermelon Seeds", brand: "watermelon", price: "₹500-700 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/7/433246651/GR/EI/SP/186389190/dried-watermelon-seeds.jpg" },
    { id: 51, name: "Pine Nuts (Chilgoza Premium)", brand: "pinenut", price: "₹2,800-3,500 per kg", image: "https://valleyspremium.in/wp-content/uploads/2023/02/Untitled-design-2024-04-26T112442.121.jpg" },
    { id: 52, name: "Dried Black Figs", brand: "fig", price: "₹800-1,000 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/7/432373334/AD/YK/WO/186389190/dried-black-mission-fig-500x500.jpg" },
    { id: 53, name: "Roasted Pumpkin Seeds", brand: "pumpkin", price: "₹850-1,100 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/12/475640488/DU/IH/HC/2044275/roasted-pumpkin-seed-500x500.jpg" },
    { id: 54, name: "Roasted Chia Mix", brand: "chia", price: "₹700-950 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2022/11/LC/LX/BR/101533712/uper-mix-seeds-roasted-mix-seeds-pumpkin-chia-flax-sunflower-watermelon-seeds-.jpg" },
    { id: 55, name: "Black Chia Seeds", brand: "chia", price: "₹600-850 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/2/490226199/UE/XS/ZY/189175767/black-chia-seeds-500x500.png" },
    { id: 56, name: "Pecan Nuts", brand: "pecan", price: "₹1,800-2,200 per kg", image: "https://therootsource.in/cdn/shop/files/IMG_3446.jpg?v=1739886246&width=1080" },
    { id: 57, name: "Dried Blackberries", brand: "blackberry", price: "₹1,100-1,400 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/9/452558841/DX/HB/VW/82868951/black-berry-500x500.jpg" },
    { id: 58, name: "Dried Gooseberries (Amla)", brand: "amla", price: "₹400-650 per kg", image: "https://www.jiomart.com/images/product/original/rvatcffbnp/dried-amla-candy-250gm-organic-dry-indian-gooseberry-fruit-mouth-freshener-without-added-sugar-or-preservatives-product-images-orvatcffbnp-p597461605-0-202301101530.jpg?im=Resize=(1000,1000)" },
    { id: 59, name: "Dried Tamarind", brand: "tamarind", price: "₹200-400 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/4/506835188/UI/BD/BA/205628097/seedless-tamarind.jpeg" },
    { id: 60, name: "Dried Orange Peel", brand: "orange", price: "₹500-750 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2024/4/411060961/PT/AR/LA/1473185/dried-orange-peel.png" },
    { id: 61, name: "Dried Pineapple Tidbits", brand: "pineapple", price: "₹700-900 per kg", image: "https://m.media-amazon.com/images/I/41kODWpIuKL.jpg" },
    { id: 62, name: "Roasted Mixed Seeds", brand: "mix", price: "₹600-800 per kg", image: "https://cdn.shopaccino.com/dalnrice/products/71z31waoalsl1024-663651_l.jpg?v=610" },
    { id: 63, name: "Dried Black Grapes", brand: "raisin", price: "₹250-400 per kg", image: "https://trvcashews.com/shop/wp-content/uploads/2021/05/Black-Raisins-with-seed.jpg" },
    { id: 64, name: "Dried Papaya Spears", brand: "papaya", price: "₹550-750 per kg", image: "https://m.media-amazon.com/images/I/410Ip6AElYL.jpg" },
    { id: 65, name: "Roasted Flaxseed Mix", brand: "flaxseed", price: "₹300-500 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2023/8/334242722/AE/ZB/TA/186822836/whatsapp-image-2023-08-11-at-7-01-21-pm-500x500.jpeg" },
    { id: 66, name: "Dried Cranberry Mix", brand: "cranberry", price: "₹650-900 per kg", image: "https://hadleyfruitorchards.com/wp-content/uploads/2021/07/Roasted-Royal-Cranberry-Trail-Mix.jpg " },
    { id: 67, name: "Premium Trail Mix with Berries", brand: "trailmix", price: "₹1,000-1,300 per kg", image: "https://mtnman.com/cdn/shop/collections/HARVEST_MARMONY_1.jpg?v=1587409137&width=750" },
    { id: 68, name: "Dried Fig Rings", brand: "fig", price: "₹700-950 per kg", image: "https://5.imimg.com/data5/NT/RW/MY-31575497/kashmiri-dry-figs-500x500.jpg" },
    { id: 69, name: "Dried Apple Chunks", brand: "apple", price: "₹650-900 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2022/5/WK/NY/AE/66764262/dehydrated-apple-slices.jpeg" },
    { id: 70, name: "Honey Coated Almonds", brand: "almond", price: "₹950-1,200 per kg", image: "https://anybodycanbake.com/wp-content/uploads/2017/08/Honey-Glazed-Almonds.jpg" },
    { id: 71, name: "Brazil Nuts", brand: "brazilnut", price: "₹2,200-2,800 per kg", image: "https://media.post.rvohealth.io/wp-content/uploads/2022/05/brazil-nuts-1296x728-body.jpg" },
    { id: 72, name: "Goji Berries", brand: "goji", price: "₹1,200-1,600 per kg", image: "https://www.mumubath.com/cdn/shop/articles/bowl_of_goji_berrie.png?v=1732442859&width=1024" },
    { id: 73, name: "Dried Kiwi Slices", brand: "kiwi", price: "₹700-900 per kg", image: "https://m.media-amazon.com/images/I/41QLkVsh4YL.jpg" },
    { id: 74, name: "Dried Blueberriesa", brand: "blueberry", price: "₹1,300-1,700 per kg", image: "https://5.imimg.com/data5/ANDROID/Default/2025/6/518109894/VA/YU/QV/65727612/product-jpeg.jpg" },
    { id: 75, name: "Dried Mango Slices", brand: "mango", price: "₹750-950 per kg", image: "https://www.chhappanbhog.com/wp-content/uploads/2022/07/Mango-1.jpg" },
    { id: 76, name: "Cranberry Almond Mix", brand: "mix", price: "₹900-1,200 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ak7WeVggyIKN2s6l41uEK6Cj8_k-5HX5rruxA8bLtk3jmf-nUYlWsr4vCNnL6nGer28&usqp=CAU" }
            ]
        },
        Flowers: {
            name: "Rose & Flowers",
            brands: ["Roses Only", "ProFlowers", "FTD", "Teleflora", "Bouqs", "Urban Stems"],
            products: [
              { id: 1, name: "Red Rose Bouquet", brand: "rose", price: "₹500-1,000 per dozen", image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-36-red-roses-bunch-359201-m.jpg" },
    { id: 2, name: "White Lily", brand: "lily", price: "₹400-800 per dozen", image: "https://cdn.bloomsflora.com/uploads/product/bloomsflora/12_83_12.webp" },
    { id: 3, name: "Colorful Tulip", brand: "tulip", price: "₹600-1,200 per dozen", image: "https://organicbazar.net/cdn/shop/files/Tulip_Mixed_Color_Flower_Bulbs.jpg?v=1759924010" },
    { id: 4, name: "Exotic Orchid", brand: "orchid", price: "₹800-1,500 per plant", image: "https://m.media-amazon.com/images/I/715Ct5vqxkL._UF1000,1000_QL80_.jpg" },
    { id: 5, name: "Yellow Sunflower", brand: "sunflower", price: "₹300-600 per dozen", image: "https://i.etsystatic.com/8218820/r/il/01ac40/1577281449/il_1080xN.1577281449_6522.jpg" },
    { id: 6, name: "Pink Rose", brand: "rose", price: "₹450-900 per dozen", image: "https://m.media-amazon.com/images/I/51DXfYOmjPL._UF1000,1000_QL80_.jpg" },
    { id: 7, name: "Tiger Lily", brand: "lily", price: "₹500-1,000 per dozen", image: "https://cdn.shopify.com/s/files/1/0555/8363/7660/files/Urban-plants-lily-flowers-bulb_480x480.jpg?v=1662032444" },
    { id: 8, name: "Red Tulip", brand: "tulip", price: "₹550-1,100 per dozen", image: "https://m.media-amazon.com/images/I/41SqS4Od+DL._UF1000,1000_QL80_.jpg" },
    { id: 9, name: "Purple Orchid", brand: "orchid", price: "₹900-1,800 per plant", image: "https://m.media-amazon.com/images/I/716wuLxEwjL._UF1000,1000_QL80_.jpg" },
    { id: 10, name: "Giant Sunflower", brand: "sunflower", price: "₹350-700 per dozen", image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80" },
    
    // 10 More Flower Products
    { id: 11, name: "Mixed Flower Bouquet", brand: "mixed", price: "₹700-1,400 per bouquet", image: "https://hyderabadgiftsdelivery.com/prod_img500/1693892296361.webp" },
    { id: 12, name: "Carnation Bunch", brand: "carnation", price: "₹350-700 per dozen", image: "https://www.fnp.com/images/pr/l/v20250522122912/pretty-pink-carnations-bouquet_1.jpg" },
    { id: 13, name: "Gerbera Daisies", brand: "gerbera", price: "₹400-800 per dozen", image: "https://www.bhg.com/thmb/4D297lgZZwqkRZRMuanWySbYCZA=/1244x0/filters:no_upscale():strip_icc()/red-gerbera-daisies-b9580fce41314e999ff0a78b965eb2ce.jpg" },
    { id: 14, name: "Marigold Garland", brand: "marigold", price: "₹200-400 per kg", image: "https://www.satvikstore.in/cdn/shop/files/garland2.jpg?v=1691663655" },
    { id: 15, name: "Jasmine String", brand: "jasmine", price: "₹150-300 per string", image: "https://nanbanpookkal.in/wp-content/uploads/2024/02/FA006-%E2%80%93-Jasmine-Flower-String-%E2%80%93-10-nos.jpg.webp" },
    { id: 16, name: "Lotus Flower", brand: "lotus", price: "₹100-250 per piece", image: "https://www.harpercrown.com/cdn/shop/articles/everything-you-should-know-about-the-lotus-flower-450435.jpg?v=1704290246" },
    { id: 17, name: "Chrysanthemum Bunch", brand: "chrysanthemum", price: "₹300-600 per dozen", image: "https://theflora.in/cdn/shop/products/Chrysanthemum2.jpg?v=1664724668&width=3384" },
    { id: 18, name: "Hibiscus Plant", brand: "hibiscus", price: "₹250-500 per plant", image: "https://images-cdn.ubuy.co.in/655b4c4d14be8218756e1dea-hawaiian-red-hibiscus-plant-cutting.jpg" },
    { id: 19, name: "Daisy Bouquet", brand: "daisy", price: "₹450-900 per bouquet", image: "https://m.media-amazon.com/images/I/81LrcJfpdZL.jpg" },
    { id: 20, name: "Lavender Bunch", brand: "lavender", price: "₹400-800 per bunch", image: "https://m.media-amazon.com/images/I/51mE30N69+L._UF894,1000_QL80_.jpg" }
            ]
        },
        Oil: {
            name: "Cooking Oils",
            brands: [
                "sunflower", "olive", "coconut", "palm", "soybean", "mustard",
                "groundnut", "ricebran", "sesame", "cottonseed", "blend",
                "flaxseed", "avocado", "canola", "corn", "almond", "walnut",
                "safflower", "perilla", "hemp", "blackseed", "argan",
                "grapeseed", "macadamia", "pumpkin", "black_sesame", "apricot",
                "peach", "ricebran_safflower", "camelina", "chia",
                "sunflower_blend", "mixed_veg", "palm_olein", "coconut_refined",
                "mustard_ricebran", "sunolive", "groundnut_coldpressed",
                "cottonseed_refined", "ghee", "camellia", "pistachio", "brazilnut",
                "pomegranate"
            ],
            products: [
                { id: 1, name: "Premium Sunflower Oil", brand: "sunflower", price: "₹120-140 per liter", image: "https://static.vecteezy.com/system/resources/thumbnails/046/829/257/small_2x/olive-oil-bowl-isolated-on-transparent-background-png.png" },
                { id: 2, name: "Extra Virgin Olive Oil", brand: "olive", price: "₹800-1200 per liter", image: "https://static.vecteezy.com/system/resources/previews/052/935/410/non_2x/organic-olive-oil-in-bowl-free-png.png" },
                { id: 3, name: "Organic Coconut Oil", brand: "coconut", price: "₹200-300 per liter", image: "https://cdn.imgbin.com/2/19/20/imgbin-cooking-oil-vegetable-oil-olive-oil-oil-slick-tea-illustration-fPxiqhpnsS3ii93385Vah4F8V.jpg" },
                { id: 4, name: "Refined Palm Oil", brand: "palm", price: "₹90-110 per liter", image: "https://banner2.cleanpng.com/lnd/20240419/ajf/transparent-cooking-oil-bowl-oil-liquid-pouring-transparent-bowl-filled-with-pouring-liquid-oil662281cb3dc1a1.48198556.webp" },
                { id: 5, name: "Soybean Oil Premium", brand: "soybean", price: "₹110-130 per liter", image: "https://png.pngtree.com/png-vector/20241229/ourmid/pngtree-glass-bowl-of-olive-oil-with-stainless-steel-spoon-isolated-on-png-image_14976626.png" },
                { id: 6, name: "Sunflower Cooking Oil", brand: "sunflower", price: "₹115-135 per liter", image: "https://villageorganica.com/cdn/shop/files/web23.jpg?v=1736224192&width=1445" },
                { id: 7, name: "Olive Oil Blend", brand: "olive", price: "₹500-700 per liter", image: "https://www.greendna.in/cdn/shop/products/sunflower2_600x.jpg?v=1562518227" },
                { id: 8, name: "Virgin Coconut Oil", brand: "coconut", price: "₹250-350 per liter", image: "https://www.shutterstock.com/image-photo/closeup-photo-sunflower-oil-seeds-260nw-737806954.jpg" },
                { id: 9, name: "Palm Kernel Oil", brand: "palm", price: "₹100-120 per liter", image: "https://www.ariyancorp.com/wp-content/uploads/2020/04/REFINED-BLEACHED-DEODORIZED-RBD-PALM-KERNEL-OIL.jpg" },
                { id: 10, name: "Refined Soybean Oil", brand: "soybean", price: "₹105-125 per liter", image: "https://olivewellnessinstitute.org/wp-content/uploads/2024/02/shutterstock_150359531-scaled.jpg" },
                { id: 11, name: "Mustard Oil (Kachi Ghani / Cold Pressed)", brand: "mustard", price: "₹150-200 per liter", image: "https://kalaguragampa.com/media/catalog/product/cache/bde31e1ff3b3df1c640a56baa1663e87/M/u/Mustard-Oil-1lt-1.jpg" },
                { id: 12, name: "Groundnut (Peanut) Oil", brand: "groundnut", price: "₹180-250 per liter", image: "https://onlyhydroponics.in/cdn/shop/files/peanut_oil2.jpg?v=1704344186" },
                { id: 13, name: "Rice Bran Oil (Refined)", brand: "ricebran", price: "₹160-200 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2024/11/463033513/IH/JQ/QU/192845000/rice-bran-oil-500x500.jpg" },
                { id: 14, name: "Sesame Oil (Til Oil)", brand: "sesame", price: "₹300-450 per liter", image: "https://i.mscwlns.co/media/misc/others/download_1737700623580_sesame-seed-oil-for-hair_7b4q88.png" },
                { id: 15, name: "Cottonseed Oil (Refined)", brand: "cottonseed", price: "₹140-180 per liter", image: "https://media.post.rvohealth.io/wp-content/uploads/2018/12/cottonseed_oil-732x549-thumbnail.jpg" },
                { id: 16, name: "Blended / Vanaspati / Hydrogenated Oil", brand: "blend", price: "₹110-150 per liter", image: "https://3.imimg.com/data3/FF/DC/GLADMIN-10872/hydrogenated-vegetable-oil-250x250.jpg" },
                { id: 17, name: "Flaxseed (Linseed) Oil", brand: "flaxseed", price: "₹350-500 per liter", image: "https://spack-international.com/wp-content/uploads/2019/06/spack-international-organic-flaxseed-oil.jpg" },
                { id: 18, name: "Avocado Oil (Cold Pressed)", brand: "avocado", price: "₹1,000-1,500 per liter", image: "https://5.imimg.com/data5/IOS/Default/2023/7/323024946/QF/AD/GV/159257328/product-jpeg-500x500.png" },
                { id: 19, name: "Canola Oil (Refined)", brand: "canola", price: "₹180-250 per liter", image: "https://www.ficsi.in/blog/wp-content/uploads/2024/07/Blog-3-3.jpg" },
                { id: 20, name: "Corn Oil", brand: "corn", price: "₹160-210 per liter", image: "https://www.bestofhungary.co.uk/cdn/shop/products/Organic-Maize-Oil.jpg?v=1754026748&width=600" },
                { id: 21, name: "Almond Oil (Edible Grade)", brand: "almond", price: "₹1,200-1,800 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2024/2/389134114/VF/KO/CB/3863875/cold-pressed-almond-oil-500x500.png" },
                { id: 22, name: "Walnut Oil", brand: "walnut", price: "₹1,000-1,400 per liter", image: "https://hargunagrotech.in/wp-content/uploads/2024/10/Walnut-Oil.jpg" },
                { id: 23, name: "Safflower Oil (Kardi Oil)", brand: "safflower", price: "₹180-230 per liter", image: "https://cdn2.stylecraze.com/wp-content/uploads/2018/11/Safflower-Oil-For-Skin-Benefits-Usage-And-Side-Effects-Banner.jpg.webp" },
                { id: 24, name: "Perilla Oil", brand: "perilla", price: "₹700-900 per liter", image: "https://vijayimpex.co.in/wp-content/uploads/2021/02/perilla-seed-oil.jpg" },
                { id: 25, name: "Hemp Seed Oil", brand: "hemp", price: "₹800-1,000 per liter", image: "https://images.ctfassets.net/w7pbeqztoxtb/puqjfyoOeKpq4mKeHp1JI/68724bc3c8c30e71ec8b851929a0aa6b/HE-HempSeedOil-ImagePrep-370x350.jpg?q=80" },
                { id: 26, name: "Black Seed (Kalonji) Oil", brand: "blackseed", price: "₹500-650 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2023/7/329802803/FE/HR/XN/50259712/black-seed-oil-kalonji-oil-for-hair-growth-cold-pressed-100-pure-and-natural.jpg" },
                { id: 27, name: "Argan Oil (Food Grade)", brand: "argan", price: "₹1,500-2,000 per liter", image: "https://d3awvtnmmsvyot.cloudfront.net/api/file/hKerjtU8Qd2Y6sQv6B1I/convert?fit=max&w=570&cache=true" },
                { id: 28, name: "Grapeseed Oil", brand: "grapeseed", price: "₹600-850 per liter", image: "https://ases.in/cdn/shop/files/Oil_Grapeseed.png?v=1726598281" },
                { id: 29, name: "Macadamia Nut Oil", brand: "macadamia", price: "₹1,200-1,600 per liter", image: "https://www.nomnuts.com.au/wp-content/uploads/2022/04/macadamia-oil.jpg" },
                { id: 30, name: "Pumpkin Seed Oil", brand: "pumpkin", price: "₹800-1,100 per liter", image: "https://epicuren.com/cdn/shop/articles/pumpkin-seed-oil_d5ee80c8-c0ee-460c-b109-46c1b9814422_600x600_crop_center.jpg?v=1746123450" },
                { id: 31, name: "Pumpkin Seed Oil (Refined)", brand: "pumpkin", price: "₹750-1,100 per liter", image: "https://ases.in/cdn/shop/products/Pumpkin_Seed_Oil_732x549-thumbnail.jpg?v=1714513728" },
                { id: 32, name: "Walnut Oil (Cold Pressed)", brand: "walnut", price: "₹900-1,300 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2024/9/452724493/QK/LO/BM/222607550/walnut-oil-500x500.webp" },
                { id: 33, name: "Almond Oil (Edible Grade)", brand: "almond", price: "₹1,200-1,800 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2023/12/372423098/II/XF/QJ/57089995/almond-oil-edible-grade.jpg" },
                { id: 34, name: "Grapeseed Oil (Refined)", brand: "grapeseed", price: "₹600-900 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2021/1/ZJ/TJ/ZQ/47679737/grape-seed-oil.jpg" },
                { id: 35, name: "Avocado Oil (Cold Pressed)", brand: "avocado", price: "₹1,000-1,500 per liter", image: "https://5.imimg.com/data5/IOS/Default/2023/7/323024946/QF/AD/GV/159257328/product-jpeg-500x500.png" },
                { id: 36, name: "Flaxseed (Linseed) Oil", brand: "flaxseed", price: "₹300-500 per liter", image: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/99864090-f38d-415d-b2ee-991f79170cd9/flaxseedOilSeeds-1177630853-770x553-1_jpg" },
                { id: 37, name: "Hemp Seed Oil", brand: "hemp", price: "₹700-1,100 per liter", image: "https://media.post.rvohealth.io/wp-content/uploads/2020/08/5779-hemp_oil-732x549-thumbnail-732x549.jpg" },
                { id: 38, name: "Black Seed (Kalonji) Oil", brand: "blackseed", price: "₹400-650 per liter", image: "https://byaaronwallace.com/cdn/shop/files/blackseed_oil_1200_x_1200_800x.png?v=1649751715" },
                { id: 39, name: "Safflower Oil (Kardi)", brand: "safflower", price: "₹180-240 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2023/10/354690910/CF/LH/DW/28126606/kardi-oil-also-known-as-safflower-oil-500x500.jpg" },
                { id: 40, name: "Perilla Oil", brand: "perilla", price: "₹650-900 per liter", image: "https://www.shutterstock.com/image-photo/perilla-seeds-oil-on-natural-260nw-2466775271.jpg" },
                { id: 41, name: "Camellia (Tea Seed) Oil", brand: "camellia", price: "₹900-1,300 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2022/5/TN/NU/LK/112695777/camellia-oil-500x500.jpg" },
                { id: 42, name: "Pistachio Oil (Food Grade)", brand: "pistachio", price: "₹1,500-2,200 per liter", image: "https://img.freepik.com/premium-photo/pistachio-oil-table-close-up_441923-9400.jpg" },
                { id: 43, name: "Brazil Nut Oil", brand: "brazilnut", price: "₹1,400-1,800 per liter", image: "https://www.cosmacon.de/wp-content/uploads/2023/06/Brazil-nut-oil-.jpg" },
                { id: 44, name: "Pomegranate Seed Oil", brand: "pomegranate", price: "₹1,700-2,400 per liter", image: "https://www.shivaexportsindia.com/cdn/shop/products/pomegranate-seed-oil-3_grande.jpg?v=1650715595" },
                { id: 45, name: "Sesamum Indicum (Black Sesame) Oil", brand: "black_sesame", price: "₹400-700 per liter", image: "https://yarrowpharm.com/wp-content/uploads/2021/10/Sesame-oil.jpg" },
                { id: 46, name: "Apricot Kernel Oil", brand: "apricot", price: "₹1,100-1,600 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2025/2/491655747/KT/LS/UD/2004466/apricot-kernel-oil-1-500x500.jpg" },
                { id: 47, name: "Peach Kernel Oil", brand: "peach", price: "₹1,000-1,500 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2023/1/QW/RW/OU/182147771/peach-kernel-carrier-oil.jpg" },
                { id: 48, name: "Rice Bran/Safflower Hybrid Oil", brand: "ricebran_safflower", price: "₹200-280 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2025/4/505185099/YE/ZR/AA/7839426/rice-bran-oil-500x500.jpeg" },
                { id: 49, name: "Camelina Oil (Gold-of-Pleasure)", brand: "camelina", price: "₹800-1,200 per liter", image: "https://bulknaturaloils.com/media/catalog/product/cache/5b89197651ea0053483b6b3397eafb60/c/a/camelina-oil-710w.jpg" },
                { id: 50, name: "Chia Seed Oil (Edible Grade)", brand: "chia", price: "₹1,300-1,900 per liter", image: "https://m.media-amazon.com/images/I/914qPWcDuZL._UF350,350_QL80_.jpg" },
                { id: 51, name: "Sunflower Blended Oil", brand: "sunflower_blend", price: "₹130-160 per liter", image: "https://cpimg.tistatic.com/7748932/b/1/sunflower-oil.jpg" },
                { id: 52, name: "Mixed Vegetable Oil", brand: "mixed_veg", price: "₹100-130 per liter", image: "https://5.imimg.com/data5/CK/AT/MY-25607380/refined-cooking-oil-500x500.jpg" },
                { id: 53, name: "Palm Olein Oil", brand: "palm_olein", price: "₹95-115 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351297619/QL/GU/GM/25824031/palm-olein-oil-500x500.jpg" },
                { id: 54, name: "Coconut Cooking Oil (Refined)", brand: "coconut_refined", price: "₹180-260 per liter", image: "https://www.ishtaorganics.in/cdn/shop/files/Fireflycoconutoilin2bottlesonein500mlanotherin1lwithacoconutinsideandwhiebackgrou.jpg?v=1712694482" },
                { id: 55, name: "Blended Mustard & Rice Bran Oil", brand: "mustard_ricebran", price: "₹160-210 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2024/4/413968914/EJ/GA/CZ/72344/rice-bran-oil.jpg" },
                { id: 56, name: "Sunflower & Olive Oil Mix", brand: "sunolive", price: "₹400-550 per liter", image: "https://www.saveur.com/uploads/2021/08/20/best-olive-oil-saveur.jpg?format=webp&optimize=high&precrop=1%3A1%2Csmart" },
                { id: 57, name: "Cold Pressed Groundnut Oil", brand: "groundnut_coldpressed", price: "₹200-270 per liter", image: "https://onlyhydroponics.in/cdn/shop/files/peanut_oil2.jpg?v=1704344186" },
                { id: 58, name: "Refined Cottonseed Oil", brand: "cottonseed_refined", price: "₹150-190 per liter", image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YL/NI/LJ/59533232/cotton-seed.jpg" },
                { id: 59, name: "Pure Desi Ghee (Clarified Butter)", brand: "ghee", price: "₹500-700 per liter", image: "https://www.allrecipes.com/thmb/CHCtUsb4c2rqDm8ER7aM4G0PcpE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ghee-vs-Clarified-Butter-4x3-9876046654434b6489f7ece61e12a54b.jpg" }
            ]
        },
        Beverages: {
            name: "Beverages & Drinks",
            brands: ["Coca-Cola", "Pepsi", "Nestlé", "Starbucks", "Red Bull", "Monster"],
            products: [
                 { id: 1, name: "Cola Soft Drink", brand: "softdrink", price: "₹40-60 per 500ml", image: "https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2019/09/1140-diet-soda-study.jpg" },
    { id: 2, name: "Orange Juice", brand: "juice", price: "₹80-120 per liter", image: "https://vegboxfresh.co.uk/cdn/shop/products/OrangeJuice_800x.jpg?v=1604669022" },
    { id: 3, name: "Energy Drink", brand: "energy", price: "₹100-150 per 250ml", image: "https://www.aboutlawsuits.com/wp-content/uploads/energy-drink-splash-220.jpg" },
    { id: 4, name: "Bottled Water", brand: "water", price: "₹20-30 per liter", image: "https://www.verywellhealth.com/thmb/y-OAKkiQkRKDsit4evoGyCG8gu0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/water-bottles-ice-doram-Eplus-GettyImages-172391327-56a9dbe55f9b58b7d0ff907f.jpg" },
    { id: 5, name: "Lemonade Soft Drink", brand: "softdrink", price: "₹50-80 per 500ml", image: "https://media.istockphoto.com/id/544468096/photo/lemonade-with-lemon-mint-and-ice.jpg?s=612x612&w=0&k=20&c=XkJqJVWwovEKvCJM7fY59hL_rj7WgH9v_0ZBjflugKA=" },
    { id: 6, name: "Apple Juice", brand: "juice", price: "₹90-140 per liter", image: "https://media.istockphoto.com/id/503096289/photo/apple-juice-pouring-from-red-apples-into-a-glass.jpg?s=612x612&w=0&k=20&c=IUX6P386QI4V2641c8zYmnVl52nJMhhsCA2rUctHjqM=" },
    { id: 7, name: "Sparkling Water", brand: "water", price: "₹30-50 per liter", image: "https://connect.healthkart.com/wp-content/uploads/2022/11/900x500_banner_HK-Sparkling-water-does-it-benefit-the-health-.png" },
    { id: 8, name: "Iced Tea (bottled)", brand: "tea", price: "₹60-120 per 500ml", image: "https://www.meleztea.com/cdn/shop/collections/IcedTeaIceBucket.jpg?crop=center&height=1200&v=1698864501&width=1200" },
    { id: 9, name: "Cold Coffee (ready)", brand: "coffee", price: "₹80-150 per 300ml", image: "https://mytastycurry.com/wp-content/uploads/2024/06/cold-coffee-recipe-best-1-480x270.jpg" },
    { id: 10, name: "Ginger-Lemon Drink", brand: "natural", price: "₹60-120 per 300ml", image: "https://assets.epicurious.com/photos/57ced55ee6411cab70f0d948/1:1/w_2560%2Cc_limit/fresh-mint-and-ginger-lemonade.jpg" },
    
    // 10 More Beverage Products
    { id: 11, name: "Mango Juice", brand: "juice", price: "₹100-160 per liter", image: "https://www.crazyvegankitchen.com/wp-content/uploads/2023/06/mango-juice-recipe.jpg" },
    { id: 12, name: "Sports Drink", brand: "energy", price: "₹70-130 per 500ml", image: "https://truesport.org/wp-content/uploads/sports-drinks-oral-rehydration-post.jpg" },
    { id: 13, name: "Mineral Water (1L)", brand: "water", price: "₹25-40 per liter", image: "https://5.imimg.com/data5/RG/EZ/IX/ANDROID-107012567/product-jpeg-500x500.jpeg" },
    { id: 14, name: "Pomegranate Juice", brand: "juice", price: "₹120-180 per liter", image: "https://images.archanaskitchen.com/images/recipes/drink-recipes/drinks-beverages-smoothie-recipes/Homemade_Pomegranate_Juice_With_Ginger_1_d25684ea99.jpg" },
    { id: 15, name: "Diet Cola", brand: "softdrink", price: "₹45-70 per 500ml", image: "https://cdn.mos.cms.futurecdn.net/oRRY7oSEyFyfA7kpRRFPoT-1200-80.jpg" },
    { id: 16, name: "Coconut Water", brand: "natural", price: "₹50-100 per 200ml", image: "https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/34IvWHpjsMv8yufOpA8uKK/3bbe4e5cf526caf9d8acdf184a635586/health-benefits-of-coconut-water.jpg" },
    { id: 17, name: "Green Tea Drink", brand: "tea", price: "₹70-130 per 500ml", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJOsWSQv7gOwpYlkzUXT4ejBcKt8py60bsw&s" },
    { id: 18, name: "Mixed Fruit Juice", brand: "juice", price: "₹110-170 per liter", image: "https://cdn.cdnparenting.com/articles/2020/02/03114800/MIX-FRUIT-JUICE-RECIPE.webp" },
    { id: 19, name: "Soda Water", brand: "water", price: "₹35-60 per liter", image: "https://media.istockphoto.com/id/920033090/photo/fresh-spring-sparkling-water.jpg?s=612x612&w=0&k=20&c=3K-TsSDb9nN0LfHgg0xhX2oz94P0iET0lZusOIRurNQ=" },
    { id: 20, name: "Protein Shake", brand: "energy", price: "₹150-250 per 330ml", image: "https://www.proteincakery.com/wp-content/uploads/2023/11/peanut-butter-banana-protein-shake-sq.jpg" }
            ]
        },
        Tea: {
            name: "Tea Collections",
            brands: ["Lipton", "Twinings", "Celestial Seasonings", "Bigelow", "Tetley", "Yogi"],
            products: [
                 { id: 1, name: "English Breakfast Tea", brand: "black", price: "₹300-500 per kg", image: "https://cdn.shopify.com/s/files/1/0615/9253/5282/files/Products_Signature_English_Breakfast_Horizontal_sz_1024x1024.jpg?v=1668614190" },
    { id: 2, name: "Green Tea Leaves", brand: "green", price: "₹400-600 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/3/499161110/ND/VK/UE/60890962/green-tea.png" },
    { id: 3, name: "Chamomile Herbal Tea", brand: "herbal", price: "₹200-400 per kg", image: "https://images-prod.healthline.com/hlcmsresource/images/chamomile-tea.jpg" },
    { id: 4, name: "Oolong Tea", brand: "oolong", price: "₹500-800 per kg", image: "https://aromas.com.au/product_images/uploaded_images/oolong-tea-3.jpeg" },
    { id: 5, name: "White Tea Premium", brand: "white", price: "₹600-1,000 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ciddSyc7qXcPHfRjvYKHKyoKXs7GUeRRPzNeccmSPwKugleqIXdjiTrSAhECf2huOwI&usqp=CAU" },
    { id: 6, name: "Assam Black Tea", brand: "black", price: "₹350-550 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc5cslqtrT7utrLGAav8HIZnQbCaRegX-eVXFIpGOqfsr0ULa9iAJGwcDbeQ096l04oAs&usqp=CAU" },
    { id: 7, name: "Matcha Green Tea", brand: "green", price: "₹800-1,200 per kg", image: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/matcha-green-tea-1296x728-feature.jpg?w=1155&h=1528" },
    { id: 8, name: "Peppermint Herbal Tea", brand: "herbal", price: "₹250-450 per kg", image: "https://assets.clevelandclinic.org/transform/a3ec7f82-35f9-4e41-8450-030498e44617/spearmint-Tea-1418206475_770x533_jpg" },
    { id: 9, name: "Darjeeling First Flush", brand: "black", price: "₹900-1,500 per kg", image: "https://teacultureoftheworld.com/cdn/shop/files/DarjeelingFirstFlush-50g.jpg?v=1707471854" },
    { id: 10, name: "Masala Chai Blend", brand: "spiced", price: "₹220-400 per kg", image: "https://masalaandchai.com/wp-content/uploads/2021/07/Masala-Chai-Featured.jpg" },
    
    // 10 More Tea Products
    { id: 11, name: "Earl Grey Tea", brand: "black", price: "₹450-700 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKnoIa66FWloukxKJ819GOlJ7TcW_SG-t9g&s" },
    { id: 12, name: "Jasmine Green Tea", brand: "green", price: "₹550-850 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxv1rexmjsVmyxtsFqnY0WIy68PTniZxEsw&s" },
    { id: 13, name: "Hibiscus Herbal Tea", brand: "herbal", price: "₹300-500 per kg", image: "https://5.imimg.com/data5/SELLER/Default/2025/3/499708324/BZ/YE/XX/12120359/hibiscus-tea-500x500.jpg" },
    { id: 14, name: "Nilgiri Frost Tea", brand: "black", price: "₹400-650 per kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2XW7B5V_EZmhD98M6-ieyeFKCC9f7KNn2Q&s" },
    { id: 15, name: "Tulsi Green Tea", brand: "green", price: "₹350-550 per kg", image: "https://www.greendna.in/cdn/shop/products/Thulsi-Green-Tea-1_678x.jpg?v=1629738027" },
    { id: 16, name: "Kashmiri Kahwa", brand: "spiced", price: "₹600-900 per kg", image: "https://static.india.com/wp-content/uploads/2024/09/feature-2024-09-21T185247.640.jpg##image/jpg" },
    { id: 17, name: "Lemon Ginger Tea", brand: "herbal", price: "₹280-450 per kg", image: "https://www.cubesnjuliennes.com/wp-content/uploads/2023/02/Lemon-Ginger-Tea-Recipe.jpg" },
    { id: 18, name: "Rose Green Tea", brand: "green", price: "₹500-750 per kg", image: "https://5.imimg.com/data5/NG/AF/MY-136072/rose-green-tea.jpg" },
    { id: 19, name: "Ceylon Black Tea", brand: "black", price: "₹380-600 per kg", image: "https://budleaf.com/wp-content/uploads/2024/11/Sip-Your-Way-to-Wellness-The-Incredible-Health-Benefits-of-Ceylon-Tea-1568x1045.jpeg" },
    { id: 20, name: "Honey Vanilla Chamomile", brand: "herbal", price: "₹320-520 per kg", image: "https://images.ctfassets.net/e8bhhtr91vp3/4yxXkleRjRtotJcDQ7Gwml/2d0dc82dcb5889d3f39e0d90fbffff46/worldtea_teatype_chamomille.webp?w=1600&q=60" }
            ]
        }
    };


    const industryData = productsData[currentIndustry];

    // Filter products based on search term and selected brand
    const filteredProducts = industryData.products.filter(product =>
        (product.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(currentSearchTerm.toLowerCase())) &&
        (selectedBrand === '' ||
         product.brand === selectedBrand || 
         product.name === selectedBrand) 
    );

    const handleBrandClick = (brand) => {
        console.log('Brand clicked:', brand, 'Current selected brand:', selectedBrand);
        const newBrand = selectedBrand === brand ? '' : brand;
        setSelectedBrand(newBrand);
        console.log('New selected brand:', newBrand);
        if (isSidebarOpen) toggleSidebar();
    };

    const clearBrandFilter = () => {
        console.log('Clearing brand filter');
        setSelectedBrand('');
        if (isSidebarOpen) toggleSidebar();
    };

    // Handle add to cart with auth check
    const handleAddToCart = (product) => {
        if (onAuthRequired('addToCart')) {
            alert(`Added ${product.name} to cart!`);
        }
    };

    // Handle order now with auth check
    const handleOrderNow = (product) => {
        if (onAuthRequired('orderNow')) {
            const modalProduct = {
                ...product,
                category: product.brand,
                variety: product.name
            };
            setSelectedProduct(modalProduct);
            setShowBuyModal(true);
        }
    };

    // Profile for BuyModal
    const profileForModal = currentUser ? {
        fullName: currentUser.displayName,
        email: currentUser.email,
        phone: currentUser.phone || ''
    } : null;

    return (
        <section id="products" className="bg-dark min-h-screen">
            <div className="w-full m-0 p-0">
                <button
                    className="lg:hidden fixed top-20 left-0 z-[110] text-secondary hover:text-accent transition-colors text-2xl p-5 rounded-full bg-white/40 hover:bg-white/50 shadow-xl border-2 border-secondary"
                    onClick={toggleSidebar}
                >
                    <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
                <div className="flex flex-col lg:flex-row gap-1 m-0 p-0">
                    <div className="sidebar-container lg:w-1/3 m-0 p-0">
                        <Sidebar
                            goBackToProducts={goBackToProducts}
                            industryData={industryData}
                            selectedBrand={selectedBrand}
                            handleBrandClick={handleBrandClick}
                            clearBrandFilter={clearBrandFilter}
                            filteredProducts={filteredProducts}
                            isSidebarOpen={isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                        />
                    </div>
                    <div className="lg:w-2/3 p-2">
                        {currentSearchTerm && (
                            <div className="text-center mb-2">
                                <div className="inline-block bg-white/10 rounded-full px-4 py-2">
                                    <span className="text-light text-sm">
                                        Search results for: <span className="text-accent font-semibold">"{currentSearchTerm}"</span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="products-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card group">
                                    <div className="p-4 text-center">
                                        <div className="mb-2">
                                            <img src={product.image} alt={product.name} className="w-40 h-28 object-contain mx-auto mb-2" />
                                            <h3 className="text-lg font-semibold text-light mb-1">{product.name}</h3>
                                            <p className="text-gray mb-1 text-sm">{product.brand}</p>
                                            <span className="text-secondary text-base font-bold block">{product.price}</span>
                                        </div>
                                       <div className="flex gap-1">
  <button
    className="btn flex-1 bg-accent text-dark hover:bg-secondary hover:text-dark text-xs py-1"
    onClick={() => handleOrderNow(product)}
  >
    <img src="https://placehold.co/16x16/yellow/white?text=!" alt="Bolt" className="w-3 h-3 mr-1 inline-block" />
    Order
  </button>
</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-8">
                                <img src="https://source.unsplash.com/featured/?search-no-results" alt="Search" className="w-16 h-16 mx-auto mb-3" />
                                <h3 className="text-lg text-light mb-1">No products found</h3>
                                <p className="text-gray text-sm">
                                    {currentSearchTerm
                                        ? `No products match your search for "${currentSearchTerm}"`
                                        : `No products available in the selected category`
                                    }
                                </p>
                                <button
                                    onClick={clearBrandFilter}
                                    className="btn bg-accent text-dark hover:bg-secondary mt-3 text-sm py-1 px-3"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* BuyModal for ALL Products */}
            <BuyModal
                isOpen={showBuyModal}
                onClose={() => setShowBuyModal(false)}
                product={selectedProduct}
                profile={profileForModal}
                industry={currentIndustry}
            />
        </section>
    );
};
export default Products;
