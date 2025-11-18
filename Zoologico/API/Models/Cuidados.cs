using System;

namespace API.Models;

public class Cuidados
{


    public int Id { set; get; }
    public string NomeCuidado { set; get; } = string.Empty;
    public string Descricao { set; get; } = string.Empty;
    public string Frequencia { set; get; } = string.Empty;
}