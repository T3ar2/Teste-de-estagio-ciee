using Microsoft.EntityFrameworkCore;
using API.Models;
public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Animais> Animais{ get; set; }
    public DbSet<Cuidados> Cuidados{ get; set; }
}