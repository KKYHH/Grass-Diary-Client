import { useState, useEffect, useMemo } from 'react';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CONSOLE_ERROR, TOAST } from '@constants/message';
import { useToast } from '@state/toast/useToast';

type QuillEditorProps = {
  onContentChange: (content: string) => void;
  quillContent: string;
  setImage: React.Dispatch<React.SetStateAction<DiaryImage>>;
  setFile: React.Dispatch<React.SetStateAction<FormData | undefined>>;
};

type QuestionResponse = {
  question: string;
};

const QuillEditor = ({
  onContentChange,
  quillContent,
  setImage,
  setFile,
}: QuillEditorProps) => {
  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    onContentChange(editor.getHTML());
  };

  const [todayQuestion, setTodayQuestion] = useState<string>();
  const { redToast } = useToast();

  const ImageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // image icon 누르면 실행

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      const maxSize = 5 * 1024 * 1024;

      if (file && file.size > maxSize) {
        redToast(TOAST.image_capacity_limit);
        return;
      }

      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        setFile(formData);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage({
            imageId: 0,
            imageURL: reader.result as string,
          });
        };
      }
    };
  };

  useEffect(() => {
    API.get<QuestionResponse>(END_POINT.today_question)
      .then(response => {
        setTodayQuestion(response.data.question);
      })
      .catch(error => {
        console.error(CONSOLE_ERROR.question.get + error);
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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: ImageHandler,
        },
      },
    };
  }, []);

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
