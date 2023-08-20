import { ReactElement } from 'react';

import WriteRoomCategory from '../WriteRoomCategory/WriterRoomCategory';
import st from './CategorySelect.module.scss';
import { categorys, CategorySelectProps } from './type';

/**
 * 공방 개설 페이지에서 소설의 카테고리를 선택하는 checkbox input component
 * @param props CategorySelectProps
 * @returns component
 */
export default function CategorySelect(props: CategorySelectProps): ReactElement {
  return (
    <WriteRoomCategory style={props.style} compulsory categoryText="카테고리">
      <div>
        <div className={st.container}>
          {categorys.map(
            (item: string, index: number): ReactElement => (
              <label className={`${st.mt16} ${st.inputBox}`} key={index}>
                <input type="checkbox" />
                <p className={st.ml8}>{item}</p>
              </label>
            )
          )}
        </div>
        {props.isError ? <p className={st.text1}>{props.errorText}</p> : null}
      </div>
    </WriteRoomCategory>
  );
}
