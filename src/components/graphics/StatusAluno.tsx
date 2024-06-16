import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Turma } from '../../models/turma';

interface Props {
  id?: number;
}

const PieChart: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<{ name: string; data: number[] }>({
    name: 'Aprovação',
    data: [0, 0],
  });

  useEffect(() => {
    if (id !== undefined) {
      const classRoomsString = localStorage.getItem('classRooms');
      if (classRoomsString) {
        const classRooms: Turma[] = JSON.parse(classRoomsString);
        const turma = classRooms.find(t => t.id === id);
        if (turma) {
          let approved = 0;
          let failed = 0;
          turma.alunos?.forEach((aluno) => {
            if (aluno.nota && aluno.nota >= 6) {
              approved++;
            } else {
              failed++;
            }
          });
          setData({
            name: 'Aprovação',
            data: [approved, failed],
          });
        }
      }
    }
  }, [id]);
  
  const options = {
    labels: ['Aprovados', 'Reprovados'],
    colors: ['#4CAF50', '#F44336'],
    legend: {
      show: true,
      position: 'bottom' as 'bottom',
    },
  };

  return (
    <div>
      <h1><strong>Gráfico de Aprovação e Reprovação</strong></h1>
      <Chart
        options={options}
        series={data.data}
        type="pie"
        width="500"
      />
    </div>
  );
};

export default PieChart;
