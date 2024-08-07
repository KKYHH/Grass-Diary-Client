import { useState, useEffect } from 'react';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CONSOLE_ERROR } from '@constants/message';

type QuillEditorProps = {
  onContentChange: (content: string) => void;
  quillContent: string;
};

type QuestionResponse = {
  question: string;
};

const QuillEditor = ({ onContentChange, quillContent }: QuillEditorProps) => {
  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    onContentChange(editor.getHTML());
  };

  const [todayQuestion, setTodayQuestion] = useState<string>();

  useEffect(() => {
    API.get<QuestionResponse>(END_POINT.TODAY_QUESTION)
      .then(response => {
        setTodayQuestion(response.data.question);
      })
      .catch(error => {
        console.error(CONSOLE_ERROR.QUESTION.GET + error);
      });
  }, []);

  const toolbarOptions = [
    ['image'],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'image',
    'width',
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <>
      <h4>{todayQuestion ? todayQuestion : 'Loading...'}</h4>
      <br></br>
      <ReactQuill
        theme="snow"
        placeholder={todayQuestion ? todayQuestion : '일기를 작성 해보세요!'}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        value={quillContent}
        style={{ height: '70vh' }}
      />
    </>
  );
};

export default QuillEditor;
