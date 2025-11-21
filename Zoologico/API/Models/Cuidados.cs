using System;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Cuidados
{

    [Key]
    public int Id { set; get; }

    [Required(ErrorMessage = "O nome do cuidado é obrigatório.")]
    public string NomeCuidado { set; get; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória.")]
    public string Descricao { set; get; } = string.Empty;

    [Required(ErrorMessage = "A frequência é obrigatória.")]
    public string Frequencia { set; get; } = string.Empty;
}