using System;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Cuidados
{

    [Key]
    public int Id { set; get; }
    public string NomeCuidado { set; get; } = string.Empty;
    public string Descricao { set; get; } = string.Empty;
    public string Frequencia { set; get; } = string.Empty;
}