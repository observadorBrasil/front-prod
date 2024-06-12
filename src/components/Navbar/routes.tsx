import React from "react";
export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const routes: Array<NavItem> = [
  {
    label: "Clientes",
    href: "/clientes",
    children: [
      {
        label: "Visualizar",
        subLabel: "Ver clientes",
        href: "/clientes",
      },
      {
        label: "Cadastrar",
        subLabel: "Cadastrar um novo cliente",
        href: "/clientes/cadastrar",
      },
    ],
  },
  {
    label: "Busca",
    href: "/busca/simples",
    children: [
      {
        label: "Avançada",
        subLabel: "Realiza busca com filtros avançados",
        href: "/busca/avancada",
      },
      {
        label: "Simples",
        subLabel: "Realiza busca com filtros simples",
        href: "/busca/simples",
      },
    ],
  },
  {
    label: "Monitoramento",
    href: "/monitoramento",
    children: [
      {
        label: "Visualizar Filtros",
        subLabel: "Ver e editar filtros cadastrados",
        href: "/monitoramento",
      },
      {
        label: "Monitoramento",
        subLabel: "Criar filtros recorrentes para monitoramento",
        href: "/monitoramento/cadastrar",
      },
    ],
  },
  {
    label: "Usuários",
    href: "/usuarios",
    children: [
      {
        label: "Visualizar",
        subLabel: "Visualizar usuários cadastrados",
        href: "/usuarios",
      },
      {
        label: "Cadastrar",
        subLabel: "Cadastrar usuário",
        href: "/usuarios/cadastrar",
      },
    ],
  },
];

export default routes;
