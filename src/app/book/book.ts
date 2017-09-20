export class Book {
    constructor(
        public id?: number,
        public author_id?: number,
        public title?: string,
        public img?: string|any,
        public cover_url?: string[],
        public authorname?: string,
        public synopsis?: string,
        public created_at?: string,
        public updated_at?: string
    ) {}
}