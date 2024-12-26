import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MovieService {
    constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

    async getAllMovies(): Promise<Movie[]> {
        return this.movieModel.find().exec();
    }

    async getMovieByFilter(query: any): Promise<Movie[]> {
        let searchParams;

        try {
            searchParams = JSON.parse(query.q);
        } catch (error) {
            throw new Error("Invalid query format, must be JSON");
        }

        const { title, genre } = searchParams;
        const searchQuery: any = {};

        if (title) searchQuery.title = { $regex: title, $options: 'i' };
        if (genre) searchQuery.genre = { $regex: genre, $options: 'i' };

        return this.movieModel.find(searchQuery).exec();
    }

    async addMovie(movie: Movie): Promise<Movie> {
        const newMovie = new this.movieModel(movie);
        return newMovie.save();
    }

    async updateMovie(id: string, body: Movie): Promise<Movie> {
        return this.movieModel.findByIdAndUpdate(id, body, {new: true}).exec();
    }

    async deleteMovie(id: string): Promise<any> {
        return this.movieModel.findByIdAndDelete(id).exec();
    }
}
