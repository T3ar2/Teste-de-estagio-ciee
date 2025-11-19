using System;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Animais
{

    [Key]
    public int Id { set; get; }
    public string Nome { set; get; } = string.Empty;
    public string Descricao { set; get; } = string.Empty;
    public string DataNascimento { set; get; }
    public string Especie { set; get; } = string.Empty;
    public string Habitat { set; get; } = string.Empty;
    public string PaisDeOrigem { set; get; } = string.Empty;
}