export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    tags: string[];
    coverImage: string;
    readTime: string;
}