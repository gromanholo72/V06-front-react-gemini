import React from 'react';
import { useAuth } from './AutenticacaoContexto';
import './Funcoes.css';

export function Funcoes() {

    const { dadosToken } = useAuth();

    // 🏗️ Mapeamento de conteúdo por função (Renderização Condicional)
    const conteudoPorFuncao = {
        cuidadora: (
            <ul className="Lista-Diferenciais-Funcoes">
                <li>
                    <strong>⏰ Assumir o plantão:</strong> 
                    <br /> 
                    Sempre que assumir plantão encerrado pela última cuidadora. Você será avisada no momento em que a última cuidadora fechar o plantão dela.
                    Após você terá 15 min de tolerância para registrar sua entrada no toten da empresa.
                    Após 3 atrasos você será colocada na "baixa prioridade" na solicitação de plantão.
                </li>
                <li>
                    <strong>👩‍⚕️ Cuidados Diários:</strong> 
                    <br /> 
                    Responsável por registrar o dia a dia do paciente, como banhos, refeições e ocorrências, além de manter seu perfil profissional atualizado.
                </li>
            </ul>
        ),
        cliente: (
            <ul className="Lista-Diferenciais-Funcoes">
                <li>
                    <strong>📝 Solicitar Serviços:</strong>
                    <br />
                    Pode solicitar novos serviços ou orçamentos diretamente pela plataforma.
                </li>
                <li>
                    <strong>👤 Gerenciar Paciente:</strong>
                    <br />
                    Atualizar dados do paciente, como alimentação, remédios e rotina.
                </li>
                <li>
                    <strong>📊 Acompanhar Relatórios:</strong>
                    <br />
                    Visualizar relatórios de atendimento e ocorrências registradas pelas cuidadoras.
                </li>
            </ul>
        ),
        administrador: (
            <ul className="Lista-Diferenciais-Funcoes">
                <li>
                    <strong>👥 Gerenciar Usuários:</strong> 
                    <br /> 
                    Gerencia o cadastro de usuários, aprova solicitações de serviço e monitora os logs do sistema para garantir a segurança.
                </li>
                <li>
                    <strong>🛡️ Monitoramento:</strong>
                    <br />
                    Acompanhar atividades e logs de segurança do sistema.
                </li>
            </ul>
        ),
        programador: (
            <ul className="Lista-Diferenciais-Funcoes">
                <li>
                    <strong>💻 Manutenção Técnica:</strong> 
                    <br /> 
                    Manutenção técnica, monitoramento de integridade do banco de dados e implementação de novas funcionalidades.
                </li>
                <li>
                    <strong>🔧 Debugging:</strong>
                    <br />
                    Análise de logs e correção de falhas críticas.
                </li>
            </ul>
        )
    };

    // 🧱 Seleciona o conteúdo com base no token, ou mostra padrão se não encontrar
    const conteudoAtual = conteudoPorFuncao[dadosToken?.func] || (
        <ul className="Lista-Diferenciais-Funcoes">
            <li>
                <strong>👋 Bem-vindo!</strong>
                <br />
                Faça login para ver suas funções específicas.
            </li>
        </ul>
    );

    return (

        <div className="Grid-Status-Informativo-Funcoes">
            <>

                <div className="Card-Informativo-Funcoes" style={{ position: 'relative' }}>

                    <h2 className="Texto-Destaque-Funcoes">⚙️ Suas Funções na empresa</h2>
                    
                    <span className="Subtexto-Especialidade-Funcoes">
                        🛠️ Definição de responsabilidades para: <strong>{dadosToken?.func?.toUpperCase() || "VISITANTE"}</strong>
                    </span>

                    <div className="Corpo-Texto-Funcoes">
                        <p>
                            📝 É sua função como {dadosToken?.func || "visitante"}:
                        </p>

                        {conteudoAtual}

                        <p className="Frase-Final-Funcoes">
                            <strong>Mantenha seu cadastro atualizado para acessar todas as funcionalidades do seu perfil.</strong>
                        </p>
                    </div>

                </div>

            </>
        </div>

    );
}
