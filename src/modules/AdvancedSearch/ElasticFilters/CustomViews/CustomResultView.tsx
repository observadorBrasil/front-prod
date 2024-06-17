import React from "react";
import { Table, Empty } from "antd";
import { Center, CircularProgress, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import { formatDate } from "@observatorio-brasil/atores/src/utils/date";
import { SearchThemisIndex } from "../types";

interface CustomResultViewProps {
  results: SearchThemisIndex[];
  isLoading?: boolean;
}

export const CustomResultView = ({
  results,
  isLoading,
}: CustomResultViewProps) => {
  const columns = [
    {
      title: "Visualizar",
      dataIndex: "id",
      key: "visualizar",
      render: (text: any, record: any) => (
        <Link href={`/proposicoes/${record.id}`}>
          <LinkOutlined style={{ fontSize: 22, width: "65%" }} />
        </Link>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (text: any) => text?.toFixed(2),
    },
    {
      title: "Tipo de Proposição",
      dataIndex: "propositiontype",
      key: "tipoProposicao",
      render: (text: any) => {
        if (text) {
          const raw = text.toString();
          if (raw.length > 20) {
            const txt = `${raw.substring(0, 19)}...`;
            return <Tooltip label={raw}><span>{txt}</span></Tooltip>;
          } else {
            return <p>{raw}</p>;
          }
        }
        return null;
      },
    },
    {
      title: "Número",
      dataIndex: "number",
      key: "numero",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "ano",
    },
    {
      title: "Casa Legislativa",
      dataIndex: "housedescription",
      key: "casaLegislativa",
      render: (text: any) => {
        if (text) {
          const raw = text.toString();
          if (raw.length > 20) {
            const txt = `${raw.substring(0, 19)}...`;
            return <Tooltip label={raw}><span>{txt}</span></Tooltip>;
          } else {
            return <p>{raw}</p>;
          }
        }
        return null;
      },
    },
    {
      title: "Autoria",
      dataIndex: "author",
      key: "autoria",
      render: (text: any) => {
        if (text) {
          const raw = text.toString();
          if (raw.length > 20) {
            const txt = `${raw.substring(0, 19)}...`;
            return <Tooltip label={raw}><span>{txt}</span></Tooltip>;
          } else {
            return <p>{raw}</p>;
          }
        }
        return null;
      },
    },
    {
      title: "Ementa",
      dataIndex: "ementa",
      key: "ementa",
      render: (text: any) => {
        if (text) {
          const raw = text.toString();
          if (raw.length > 20) {
            const txt = `${raw.substring(0, 19)}...`;
            return <Tooltip label={raw}><span>{txt}</span></Tooltip>;
          } else {
            return <p>{raw}</p>;
          }
        }
        return null;
      },
    },
    {
      title: "Data de Apresentação",
      dataIndex: "presentationdate",
      key: "dataApresentacao",
      render: (text: any) => formatDate(text),
    },
  ];

  const transformResults = (results: SearchThemisIndex[]) => {
    return results.map((result) => ({
      key: result.id?.raw ?? `key-${Math.random()}`, // chave única para cada linha
      id: result.id?.raw,
      year: result.year?.raw,
      author: result.author?.raw,
      significance: result.significance?.raw,
      presentationdate: result.presentationdate?.raw,
      ementa: result.ementa?.raw,
      createdat: result.createdat?.raw,
      proposition: result.proposition?.raw,
      propositiontypeid: result.propositiontypeid?.raw,
      propositiontype: result.propositiontype?.raw,
      updatedat: result.updatedat?.raw,
      houseid: result.houseid?.raw,
      housedescription: result.housedescription?.raw,
      housetype: result.housetype?.raw,
      housetypeid: result.housetypeid?.raw,
      situationid: result.situationid?.raw,
      number: result.number?.raw,
      archived: result.archived?.raw,
      approvalprobability: result.approvalprobability?.raw,
      comissions: result.comissions?.raw,
      description: result.description?.raw,
      projectid: result.projectid?.raw,
      regime: result.regime?.raw,
      themeid: result.themeid?.raw,
      score: result._meta?.rawHit?._score,
    }));
  };

  const transformedResults = transformResults(results);

  if (isLoading) {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <div className="w-[99%] h-full overflow-hidden">
      <Table
        columns={columns}
        dataSource={transformedResults}
        rowKey={(record) => {
          if (record.id) {
            return record.id.toString();
          }
          if (record.score) {
            return `key-${record.score}`;
          }
          return `key-${Math.random()}`;
        }}
        pagination={false}
        scroll={{ y: '100%' }} // Ajuste a altura conforme necessário
        locale={{
          emptyText: <Empty description="Sem resultados relevantes" />,
        }}
      />
    </div>
  );
};
