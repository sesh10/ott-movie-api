import { MovieService } from './movie.service';
import { Movie } from './interfaces/movie.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    async getAllMovies(): Promise<Movie[]> {
        return this.movieService.getAllMovies();
    }

    @Get('search')
    async searchMovieByFilter(@Query() query: any): Promise<Movie[]> {
        return this.movieService.getMovieByFilter(query);
    } 

    @Post()
    async addNewMovie(@Body() movie: Movie): Promise<Movie> {
        return this.movieService.addMovie(movie);
    }

    @Put(':id')
    async updateMovie(@Param('id') id: string, @Body() movieUpdate: Movie): Promise<Movie> {
        return this.movieService.updateMovie(id, movieUpdate);
    }

    @Delete(':id')
    async deleteMovie(@Param('id') id: string): Promise<any> {
        return this.movieService.deleteMovie(id);
    }
}
