import { MovieService } from './movie.service';
import { Movie } from './interfaces/movie.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/route.decorator';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    @Public()
    async getAllMovies(): Promise<Movie[]> {
        return this.movieService.getAllMovies();
    }

    @Get('search')
    @Public()
    async searchMovieByFilter(@Query() query: any): Promise<Movie[]> {
        return this.movieService.getMovieByFilter(query);
    } 

    @Roles(Role.Admin)
    @Post()
    async addNewMovie(@Body() movie: Movie): Promise<Movie> {
        return this.movieService.addMovie(movie);
    }

    @Put(':id')
    @Roles(Role.Admin)
    async updateMovie(@Param('id') id: string, @Body() movieUpdate: Movie): Promise<Movie> {
        return this.movieService.updateMovie(id, movieUpdate);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteMovie(@Param('id') id: string): Promise<any> {
        return this.movieService.deleteMovie(id);
    }
}
