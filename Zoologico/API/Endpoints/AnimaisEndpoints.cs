using API.Models;
using Microsoft.EntityFrameworkCore;


namespace API.Endpoints;

public static class AnimaisEndpoints
{
    public static void MapAnimaisRoutes(this WebApplication app)
    {

        app.MapGet("/api/animal/listar", async (AppDbContext ctx) =>
        {
            var Animais = await ctx.Animais.ToListAsync();

            if (Animais.Any())
            {
                return Results.Ok(Animais);
            }
            return Results.NotFound("A lista de animais está vazia.");
        });

        app.MapGet("/api/animal/buscar/{id}", async (AppDbContext ctx, int id) =>
        {
            Animais? resultado = await ctx.Animais.FirstOrDefaultAsync(x => x.Id == id);
            if (resultado is null) { return Results.NotFound("Animal não encontrado."); }
            return Results.Ok(resultado);
        });

        app.MapPost("/api/animal/cadastrar", async (AppDbContext ctx, Animais novoAnimal) =>
        {
            if (string.IsNullOrWhiteSpace(novoAnimal.Nome))
            {
                return Results.BadRequest("Nome do animal é obrigatório.");
            }

            bool jaExiste = await ctx.Animais.AnyAsync(x => x.Nome == novoAnimal.Nome);
            if (jaExiste is true) { return Results.Conflict("Animal já cadastrado no bando de dados."); }
            ctx.Animais.Add(novoAnimal);
            await ctx.SaveChangesAsync();
            return Results.Created($"/api/animal/buscar/id/{novoAnimal.Id}", novoAnimal);
        });

        app.MapDelete("/api/animal/deletar/{id}", async (AppDbContext ctx, int id) =>
        {
            Animais? resultado = await ctx.Animais.FindAsync(id);
            if (resultado is null) { return Results.NotFound("não é possivel deletar algo em que não está no banco de dados."); }
            ;
            ctx.Animais.Remove(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });

        app.MapPatch("/api/animal/atualizar/{id}", async (AppDbContext ctx, int id, Animais animalAlterado) =>
        {
            Animais? resultado = await ctx.Animais.FindAsync(id);
            if (resultado is null) { return Results.NotFound("Animal não encontrado."); }
            resultado.Nome = animalAlterado.Nome;
            resultado.Descricao = animalAlterado.Descricao;
            resultado.DataNascimento = animalAlterado.DataNascimento;
            resultado.Especie = animalAlterado.Habitat;
            resultado.PaisDeOrigem = animalAlterado.PaisDeOrigem;
            ctx.Animais.Update(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });
    }
}