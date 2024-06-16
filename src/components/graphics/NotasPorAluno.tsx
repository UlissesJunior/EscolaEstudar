import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Turma } from '../../models/turma';

interface Props {
  id?: number;
}

const BarChart: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<number[]>(Array(11).fill(0));

  useEffect(() => {
    if (id !== undefined) {
      const classRoomsString = localStorage.getItem('classRooms');
      if (classRoomsString) {
        const classRooms: Turma[] = JSON.parse(classRoomsString);
        const turma = classRooms.find(t => t.id === id);
        if (turma) {
          const counts: number[] = Array(11).fill(0);
          turma.alunos?.forEach((aluno) => {
            if (aluno.nota !== undefined && aluno.nota >= 0 && aluno.nota <= 10) {
              counts[Math.floor(aluno.nota)]++;
            }
          });
          setData(counts);
        }
      }
    }
  }, [id]);
  
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: Array.from(Array(11).keys()).map(String)
    },
    yaxis: {
      title: {
        text: 'Quantidade de Alunos'
      }
    }
  } as any;

  return (
    <div>
      <h1>Gráfico de Notas dos Alunos</h1>
      <Chart
        options={options}
        series={[{ data: data }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
