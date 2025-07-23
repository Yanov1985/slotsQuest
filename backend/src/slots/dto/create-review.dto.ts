export class CreateReviewDto {
  title: string;
  content: string;
  rating: number;
  pros?: string[];
  cons?: string[];
  author_name?: string;
  author_email?: string;
}