using System;

namespace API.Models;

public class Animais
{


    public int Id { set; get; }
    public string Nome { set; get; } = string.Empty;
    public string Descricao { set; get; } = string.Empty;
    public DateOnly DataNascimento { set; get; }
    public string Especie { set; get; } = string.Empty;
    public string Habitat { set; get; } = string.Empty;
    public string PaisDeOrigem { set; get; } = string.Empty;
}