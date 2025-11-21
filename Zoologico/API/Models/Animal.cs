using System;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Animais
{

    [Key]
    public int Id { set; get; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    public string Nome { set; get; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    public string Descricao { set; get; } = string.Empty;

    [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
    public string DataNascimento { set; get; } = string.Empty;

    [Required(ErrorMessage = "A espécie é obrigatória.")]
    public string Especie { set; get; } = string.Empty;

    [Required(ErrorMessage = "O habitat é obrigatório.")]
    public string Habitat { set; get; } = string.Empty;

    [Required(ErrorMessage = "O país de origem é obrigatório.")]
    public string PaisDeOrigem { set; get; } = string.Empty;
}