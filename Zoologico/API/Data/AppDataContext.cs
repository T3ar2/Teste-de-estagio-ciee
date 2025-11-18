using Microsoft.EntityframeWork;

public class AppDbContext : DbContext
{


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Zoologico.db");
    }
}