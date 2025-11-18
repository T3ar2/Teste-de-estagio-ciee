using System;

namespace API.Models;

public class Animais
{


    public int Id { set; get; }
    public string Descricao { set; get; }
    public DateOnly DataNascimento { set; get; }
    public string Especie { set; get; }
    public string Habitat { set; get; }
    public string PaisDeOrigem { set; get; }
}