import { Search } from "@prisma/client";
import { SearchResultInterface } from "./src/api/services/search-result/interfaces/search-result.interface";

export const createMockSearch = (): Search => {
  return {
    id: 999, // ID fictício
    createdAt: new Date("2022-11-16T17:48:40.956Z"),
    name: "Abioptica",
    description: "Monitoramento de proposições sobre optica",
    advancedFormState: JSON.stringify({
      houseForm: {
        keyword: "",
        federal: { "house-1": true, "house-4": false, "house-7": false },
        state: { houses: [], houseIds: [] },
        municipal: { "house-3": false, "house-18": false, "house-28": false }
      },
      filterKeywords: [],
      mustNotKeywords: [],
      houseIds: [1],
      propositionTypeIds: [],
      situationIds: [],
      author: "",
      number: "",
      presentationDate: "",
      year: "",
      initialDate: "",
      finalDate: "2022-11-16",
      searchTerm: "",
      keyword: "",
      excludeKeyword: "",
      propositionType: "",
      situation: ""
    }),
    query: JSON.stringify({
      aggs: {},
      size: 20,
      _source: {
        includes: [
          "id",
          "year",
          "author",
          "significance",
          "presentationdate",
          "createdat",
          "proposition",
          "updatedat",
          "houseid",
          "number",
          "propositiontype",
          "housedescription",
          "ementa"
        ]
      },
      query: {
        bool: {
          filter: [
            {
              bool: {
                should: [{ term: { houseid: 1 } }]
              }
            }
          ],
          must: [],
          must_not: [],
          should: []
        }
      },
      highlight: { fields: { ementa: {} } },
      from: 0,
      sort: [{ _score: "desc" }]
    }),
    active: true
  } as Search;
};

export const resultMockSearch = (): any[] => {
  const mockData: any[] = [
    {
      id: 462629,
      createdAt: new Date("2023-07-01T08:00:00.845Z"),
      search: {
        name: "Pesquisa de Lentes de Contato"
      },
      proposition: {
        id: 1001,
        number: "10512",
        year: 2024,
        author: "Jurailton Santos",
        ementa: "Requer o Registro da Frente Parlamentar da Optometria",
        propositionType: {
          id: 38,
          description: "Requerimento"
        },
        presentationDate: new Date("2024-06-05T17:15:00.000Z"),
        house: {
          id: 1,
          description: "Assembleia Legislativa da Bahia",
          houseTypeId: 1,
          houseType: {
            id: 1,
            description: "Legislativo"
          }
        }
      },
      searchResultStatus: {
        id: 2,
        description: "PENDENTE"
      }
    },
    {
      id: 462629,
      createdAt: new Date("2023-07-02T08:00:00.845Z"),
      search: {
        name: "Regulamentação de Óculos de Grau"
      },
      proposition: {
        id: 1002,
        number: "68",
        year: 20234,
        author: "Poder executivo",
        ementa: "Institui o Imposto sobre Bens e Serviços - IBS, a Contribuição Social sobre Bens e Serviços - CBS e o Imposto Seletivo - IS e dá outras providências.",
        propositionType: {
          id: 38,
          description: "Projeto de Lei Complementar"
        },
        presentationDate: new Date("2024-04-07T17:15:00.000Z"),
        house: {
          id: 2,
          description: "Câmara dos Depoutados",
          houseTypeId: 1,
          houseType: {
            id: 1,
            description: "Legislativo"
          }
        }
      },
      searchResultStatus: {
        id: 2,
        description: "Pendente"
      }
    },
    {
      id: 462629,
      createdAt: new Date("2023-07-03T08:00:00.845Z"),
      search: {
        name: "Isenção de Impostos para Óticas"
      },
      proposition: {
        id: 1003,
        number: "1172",
        year: 2023,
        author: "Vermelho",
        ementa: "Sugere ao Poder Executivo Federal a Regulamentação da Profissão de optometrista",
        propositionType: {
          id: 38,
          description: "Indicação"
        },
        presentationDate: new Date("2023-08-16T17:15:00.000Z"),
        house: {
          id: 3,
          description: "Assembleia Legislativa",
          houseTypeId: 1,
          houseType: {
            id: 1,
            description: "Legislativo"
          }
        }
      },
      searchResultStatus: {
        id: 2,
        description: "Pendente"
      }
    },
    {
      id: 462629,
      createdAt: new Date("2023-07-03T08:00:00.845Z"),
      search: {
        name: "Isenção de Impostos para Óticas"
      },
      proposition: {
        id: 1003,
        number: "232",
        year: 2023,
        author: "Sargento Reginauro",
        ementa: "Dispõe sobre a inclusão da atividade de optometria no âmbito da prestação de serviços públicos de atenção primária à saúde visual e ocular no estado do ceará, na forma que indica.",
        propositionType: {
          id: 38,
          description: "Indicação"
        },
        presentationDate: new Date("2023-10-04T17:15:00.000Z"),
        house: {
          id: 3,
          description: "Assembleia Legislativa do Ceará",
          houseTypeId: 1,
          houseType: {
            id: 1,
            description: "Legislativo"
          }
        }
      },
      searchResultStatus: {
        id: 2,
        description: "Pendente"
      }
    },
  ];

  // Adicione mais objetos mock até completar 21
  // for (let i = 4; i <= 21; i++) {
  //   mockData.push({
  //     id: 462629,
  //     createdAt: new Date(`2023-07-${i.toString().padStart(2, '0')}T08:00:00.845Z`),
  //     search: {
  //       name: `Normas de Segurança para Ópticas ${i}`
  //     },
  //     proposition: {
  //       id: 1000 + i,
  //       number: `PL ${i.toString().padStart(3, '0')}/2023`,
  //       year: 2023,
  //       author: `Dr. Optica ${i}`,
  //       ementa: `Proposta de normas de segurança para estabelecimentos ópticos ${i}`,
  //       propositionType: {
  //         id: 38,
  //         description: "Projeto de Lei"
  //       },
  //       presentationDate: new Date(`2023-07-${i.toString().padStart(2, '0')}T17:15:00.000Z`),
  //       house: {
  //         id: i,
  //         description: `Conselho de Saúde Óptica ${i}`,
  //         houseTypeId: 1,
  //         houseType: {
  //           id: 1,
  //           description: "Legislativo"
  //         }
  //       }
  //     },
  //     searchResultStatus: {
  //       id: 2,
  //       description: i % 2 === 0 ? "Visualizado" : "Não Visualizado"
  //     }
  //   });
  // }

  return mockData;
};