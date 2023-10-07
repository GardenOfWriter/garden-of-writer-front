import React, { useEffect, useState } from 'react';

import PageContentHeader from '@/components/PageContentHeader/PageContentHeader';
import PaginationBar from '@/components/PaginationBar/PaginationBar';
import { RecruitmentTable as Table } from '@/components/RecruitmentTable/RecruitmentTable';
import { RecruitmentTable, RecruitmentTableStatus } from '@/components/RecruitmentTable/type';
import { Select } from '@/components/Select/Select';
import RecruitmentPageHeaderBackground from '@/images/recruitment-page-header-background.png';

import styles from './Recruitment.module.scss';

export const recruitmentFilters = ['전체', '모집중', '모집완료'];

export const pageContentHeader = {
  badge: '작가 참여',
  title: '혼자 글을 쓰는게 힘드시진 않으신가요?',
  description: '나와 같은 생각을 가진 작가분들과 함께 이야기를 만들어보세요.',
  backgroundImage: RecruitmentPageHeaderBackground,
};

export const recruitment = [
  {
    id: 'adasdf',
    novelTitle: '재벌집 막내아들',
    title: '같이 작성하실 분',
    admin: 'Ayaan',
    created: '2023-05-02',
    status: RecruitmentTableStatus.active,
    count: 299,
    like: 10,
    attend_users_number: 2,
    user_limit: 5,
  },
  {
    id: 'hdfgdfg',
    novelTitle: '전지적 독자 시점',
    title: '연재 고고~',
    admin: 'Ayaan',
    created: '2023-01-21',
    status: RecruitmentTableStatus.completed,
    count: 99999,
    like: 130,
    attend_users_number: 5,
    user_limit: 5,
  },
];

const RecruitmentPage = () => {
  const [filter, setFilter] = useState<string>(recruitmentFilters[1]);
  const [recruitmentTableData, setRecruitmentTableData] = useState<RecruitmentTable[]>(recruitment);

  const handleNovelFilter = (selectedItem: string) => {
    setFilter(selectedItem);
  };

  useEffect(() => {
    let filteredRecruitmentTableData = [];

    if (filter === '전체') {
      filteredRecruitmentTableData = recruitment;
    } else if (filter === '모집중') {
      filteredRecruitmentTableData = recruitment.filter(
        recruitmentTableRow => recruitmentTableRow.status === RecruitmentTableStatus.active
      );
    } else {
      filteredRecruitmentTableData = recruitment.filter(
        recruitmentTableRow => recruitmentTableRow.status === RecruitmentTableStatus.completed
      );
    }

    setRecruitmentTableData([...filteredRecruitmentTableData]);
  }, [filter]);

  return (
    <div>
      <PageContentHeader backgroundImage={pageContentHeader.backgroundImage}>
        <div className={styles.headerTextWrap}>
          <p className={styles.headerBadge}>{pageContentHeader.badge}</p>
          <h2 className={styles.headerTitle}>{pageContentHeader.title}</h2>
          <p className={styles.headerDescription}>{pageContentHeader.description}</p>
        </div>
      </PageContentHeader>

      <main className={styles.main}>
        <div className={styles.recruitmentContainer}>
          <div className={styles.recruitmentHeader}>
            <Select
              selectedItem={filter}
              options={recruitmentFilters}
              handleSelectedItem={handleNovelFilter}
            />
          </div>
          <Table tableData={recruitmentTableData} />
        </div>

        <PaginationBar />
      </main>
    </div>
  );
};

export default RecruitmentPage;
