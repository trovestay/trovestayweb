export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  status: 'draft' | 'published';
}

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Top 5 Bali Investment Trends for 2026',
    summary: 'Discover the emerging areas and property types that are driving the highest ROI for foreign investors this year.',
    content: `<p>Bali continues to be a premier destination for property investors, blending high rental yields with strong capital appreciation.</p><p>Here are the top 5 trends shaping the Bali real estate market in 2026:</p><ul><li><strong>Sustainable Eco-Villas:</strong> Properties prioritizing green energy and sustainable materials.</li><li><strong>Canggu North Expansion:</strong> As central Canggu matures, investment is moving north to Pererenan and Seseh.</li><li><strong>Co-living Spaces:</strong> High demand from digital nomads driving the creation of purpose-built community living.</li><li><strong>Smart Home Integration:</strong> Tech-enabled properties command a 15-20% premium.</li><li><strong>Long-term Leaseholds:</strong> 30+ year leaseholds are becoming the standard for serious investors.</li></ul><p>Investing early in these trends is key to maximizing returns over the next decade.</p>`,
    imageUrl: '',
    author: 'Sarah Jenkins',
    date: 'May 04, 2026',
    category: 'Market Trends',
    status: 'published'
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Seminyak Lifestyle',
    summary: 'Everything you need to know about dining, shopping, and living in Bali’s most sophisticated neighborhood.',
    content: `<p>Seminyak remains the beating heart of Bali's luxury lifestyle. From world-class dining to sunset beach clubs, this neighborhood offers an unparalleled living experience.</p><h3>Dining</h3><p>Seminyak is home to some of the finest restaurants in Southeast Asia. Whether you're looking for authentic Indonesian cuisine or modern fusion, "Eat Street" (Jalan Kayu Aya) has something for everyone.</p><h3>Shopping</h3><p>Boutique stores line the streets, offering everything from bespoke resort wear to handcrafted home goods.</p><h3>Living</h3><p>Choosing to live in Seminyak means choosing convenience and luxury. While the property prices are higher, the access to amenities makes it a prime choice for expatriates and retirees.</p>`,
    imageUrl: '',
    author: 'Wayan Putra',
    date: 'April 28, 2026',
    category: 'Lifestyle',
    status: 'published'
  },
  {
    id: '3',
    title: 'Navigating Property Law in Indonesia',
    summary: 'A beginner-friendly breakdown of Hak Milik vs Hak Pakai and what it means for foreign buyers.',
    content: `<p>Understanding Indonesian property law is critical for any foreign investor. This guide breaks down the essential titles.</p><h3>Hak Milik (Freehold)</h3><p>This is absolute ownership and is exclusively available to Indonesian citizens. Foreigners cannot legally hold Hak Milik.</p><h3>Hak Pakai (Right to Use)</h3><p>This is the most secure form of ownership for foreigners. It allows you to use the property for a specified period, typically up to 80 years when combined with extensions.</p><h3>Hak Sewa (Leasehold)</h3><p>A common alternative where you lease the property from the Hak Milik owner for a set period, usually 20-30 years.</p><p>Always consult with a reputable notary before proceeding with any property transaction in Bali.</p>`,
    imageUrl: '',
    author: 'David Lee',
    date: 'April 15, 2026',
    category: 'Legal Guide',
    status: 'published'
  }
];
