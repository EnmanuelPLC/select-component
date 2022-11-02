import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { useInfiniteQuery } from "react-query";
import React from "react";
import './custom-select.css';

interface DataJSON {
  "postId": number,
  "id": number,
  "name": string,
  "email": string,
  "body": string
}


export default function CustomSelect() {
  const [currentName, setCurrentName] = React.useState<string>('');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [dataJS, setDataJS] = React.useState<DataJSON[]>([{
    "postId": -1,
    "id": -1,
    "name": 'Default',
    "email": '',
    "body": '',
  }]);

  const fetchData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=${pageNumber * 15}&_limit=15`);
    return await res.json();
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['dataJS'],
    queryFn: fetchData,
  })

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentName(e.target.value as string);
  };

  const handleOpen = (e: any) => {
    e.preventDefault();
    if (data?.pages) {
      if (dataJS.length === 1) {
        setDataJS(dataJS.concat(data.pages[0]));
      }
      console.log('setupped')
    }
  };

  const scrolling = (e: any) => {
    e.preventDefault();
    let scroll_h = e.target.scrollHeight;
    let scroll_y = e.target.scrollTop;
    if (e.target.offsetHeight + scroll_y >= scroll_h) {
      fetchNextPage({ pageParam: (pageNumber+1) * 15 }).then((e) => {
        if (data?.pages) {
          if ((dataJS.length - 1) / 15 < data.pages.length) {
            for (let i = 0; i < data.pages.length; i++) {
              if (i + 1 > ((dataJS.length - 1) / 15)) {
                setDataJS(dataJS.concat(data.pages[i]));
              }
            }
          }
          setPageNumber(pageNumber + 1);
        }
      });
    }
  };

  return (
    <>
      <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentName}
        onChange={handleChange}
        onOpen={handleOpen}
        onScrollCapture={scrolling}
        style={{ width: '10rem', color: 'white' }}>
        {dataJS ? (
          dataJS.map((el: DataJSON, i: number) => (
            <MenuItem key={i} value={el.name} >
              {el.name}
            </MenuItem>
          ))
        ) : ('')
        }
      </Select>
    </>
  );
}
