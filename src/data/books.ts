export type Book = {
  id: number
  title: string
  author: string
  price: number
  category: string
  rating: number
  gradient: string
  description: string
  stock: number
}

export const books: Book[] = [
  {
    id: 1,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 89000,
    category: 'Văn Học',
    rating: 5,
    gradient: 'from-violet to-lavender',
    description: 'Cuốn tiểu thuyết huyền thoại về hành trình tìm kiếm kho báu và ý nghĩa cuộc sống.',
  },
  {
    id: 2,
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 76000,
    category: 'Kỹ Năng',
    rating: 5,
    gradient: 'from-sky to-indigo',
    description: 'Cuốn sách kỹ năng giao tiếp bán chạy nhất mọi thời đại với hàng triệu bản in.',
  },
  {
    id: 3,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 115000,
    category: 'Phát Triển Bản Thân',
    rating: 5,
    gradient: 'from-violet to-sky',
    description: 'Phương pháp xây dựng thói quen tốt và loại bỏ thói quen xấu một cách khoa học.',
  },
  {
    id: 4,
    title: 'Tư Duy Nhanh Và Chậm',
    author: 'Daniel Kahneman',
    price: 145000,
    category: 'Tâm Lý Học',
    rating: 4,
    gradient: 'from-navy to-violet',
    description: 'Khám phá hai hệ thống tư duy chi phối mọi quyết định trong cuộc sống của chúng ta.',
  },
  {
    id: 5,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 158000,
    category: 'Lịch Sử',
    rating: 5,
    gradient: 'from-lavender to-ice',
    description: 'Lược sử nhân loại từ thời tiền sử đến hiện đại, một cái nhìn hoàn toàn mới về con người.',
  },
  {
    id: 6,
    title: 'Deep Work',
    author: 'Cal Newport',
    price: 99000,
    category: 'Năng Suất',
    rating: 5,
    gradient: 'from-indigo to-sky',
    description: 'Nghệ thuật làm việc sâu trong thế giới đầy xao nhãng để đạt hiệu suất tối đa.',
  },
  {
    id: 7,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 129000,
    category: 'Tài Chính',
    rating: 5,
    gradient: 'from-violet to-indigo',
    description: 'Những bài học vô giá về cách con người nghĩ và hành xử với tiền bạc.',
  },
  {
    id: 8,
    title: 'Dám Bị Ghét',
    author: 'Ichiro Kishimi',
    price: 89000,
    category: 'Tâm Lý Học',
    rating: 4,
    gradient: 'from-sky to-lavender',
    description: 'Triết học Adler qua cuộc đối thoại giữa chàng thanh niên và nhà triết học về tự do.',
  },
]

export const categories = [
  { name: 'Văn Học',           icon: '📖', count: 8200,  gradient: 'from-violet to-lavender' },
  { name: 'Kỹ Năng Sống',      icon: '💡', count: 5100,  gradient: 'from-sky to-indigo' },
  { name: 'Khoa Học',          icon: '🔬', count: 4300,  gradient: 'from-navy to-violet' },
  { name: 'Lịch Sử',           icon: '🏛️', count: 3800,  gradient: 'from-lavender to-violet' },
  { name: 'Công Nghệ',         icon: '💻', count: 6500,  gradient: 'from-sky to-lavender' },
  { name: 'Tâm Lý Học',        icon: '🧠', count: 2900,  gradient: 'from-indigo to-sky' },
]
