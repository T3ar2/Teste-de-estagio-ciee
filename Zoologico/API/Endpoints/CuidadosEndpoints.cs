using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints;

public static class CuidadosEndpoints
{
    public static void MapCuidadoRoutes(this WebApplication app)
    {

        app.MapGet("/api/cuidados/listar", async (AppDbContext ctx) =>
        {
            var Cuidados = await ctx.Cuidados.ToListAsync();

            if (Cuidados.Any())
            {
                return Results.Ok(Cuidados);
            }
            return Results.NotFound("A lista de cuidados está vazia.");
        });

        app.MapGet("/api/cuidados/buscar/{id}", async (AppDbContext ctx, int id) =>
        {
            Cuidados? resultado = await ctx.Cuidados.FirstOrDefaultAsync(x => x.Id == id);
            if (resultado is null) { return Results.NotFound("Animal não encontrado."); }
            return Results.Ok(resultado);
        });

        app.MapPost("/api/cuidados/cadastrar", async (AppDbContext ctx, Animais novoCuidado) =>
        {
            if (string.IsNullOrWhiteSpace(novoCuidado.Nome))
            {
                return Results.BadRequest("Nome do animal é obrigatório.");
            }

            bool jaExiste = await ctx.Animais.AnyAsync(x => x.Nome == novoCuidado.Nome);
            if (jaExiste is true) { return Results.Conflict("Animal já cadastrado no bando de dados."); }
            ctx.Animais.Add(novoCuidado);
            await ctx.SaveChangesAsync();
            return Results.Created($"/api/cuiados/buscar/id/{novoCuidado.Id}", novoCuidado);
        });

        app.MapDelete("/api/cuidados/deletar/{id}", async (AppDbContext ctx, int id) =>
        {
            Animais? resultado = await ctx.Animais.FindAsync(id);
            if (resultado is null) { return Results.NotFound("não é possivel deletar algo em que não está no banco de dados."); }
            ;
            ctx.Animais.Remove(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });

        app.MapPatch("/api/cuidados/atualizar/{id}", async (AppDbContext ctx, int id, Cuidados cuidadoAlterado) =>
        {
            Cuidados? resultado = await ctx.Cuidados.FindAsync(id);
            if (resultado is null) { return Results.NotFound("Cuidado não encontrado."); }
            resultado.NomeCuidado = cuidadoAlterado.NomeCuidado;
            resultado.Descricao = cuidadoAlterado.Descricao;
            resultado.Frequencia = cuidadoAlterado.Frequencia;
            ctx.Cuidados.Update(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });
    }
}