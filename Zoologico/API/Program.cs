using API.Endpoints;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// --- CONFIGURAÇÃO DE SERVIÇOS (Services Configuration) ---

// Define o nome da política CORS
const string CorsPolicyName = "AllowFrontend";

// 1. Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicyName,
                      policy =>
                      {
                          // Permite requisições do seu frontend React (http://localhost:3000)
                          policy.WithOrigins("http://localhost:3000") 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// 2. Configuração do Banco de Dados (EF Core + SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

app.UseCors(CorsPolicyName);

app.MapGet("/", () => "Api está rodando");

app.MapAnimaisRoutes();

app.MapCuidadoRoutes();

app.Run();

