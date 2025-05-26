<php 

namespace App\Enums;

enum FormularioStatus: string
{
    case PENDENTE = 'pendente';
    case ACEITO = 'aceito';
    case RECUSADO = 'recusado';
}
