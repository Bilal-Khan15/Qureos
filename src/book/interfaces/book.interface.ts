import { Document } from 'mongoose';

export interface IBook extends Document {
    readonly title: string;
    readonly isbn: string;
    readonly pageCount: number;
    readonly published: {
        readonly $date: string;
        readonly price: number;
        readonly currency: string;
    };
    readonly thumbnailUrl: string;
    readonly shortDescription: string;
    readonly longDescription: string;
    readonly status: string;
    readonly authors: string[];
    readonly categories: string[];
}