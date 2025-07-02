import { Pagination as AntPagination } from "antd";
import type { PaginationProps } from "antd";

export const Pagination: React.FC<PaginationProps> = ({
  defaultCurrent=1,
  total,
  pageSize,
  ...rest
}) => {
    return (
      <AntPagination
        defaultCurrent={defaultCurrent}
        total={total}
            pageSize={pageSize}
        {...rest}
      />
    );
};
