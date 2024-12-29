import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.modules.css';
import PropsType from 'prop-types';

function Editor({ handleChnageContent, placeholder, value = null }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: ['red', '#785412'] }],
      [{ background: ['red', '#785412'] }],
    ],
  };

  const quillStyles = {
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    handleChnageContent(content);
  };

  return (
    <div>
      {value && value ? (
        <ReactQuill
          minHeight="500px"
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={quillStyles}
          onChange={handleProcedureContentChange}
          value={value}
        />
      ) : (
        <ReactQuill
          minHeight="500px"
          theme="snow"
          modules={modules}
          formats={formats}
          style={quillStyles}
          placeholder={placeholder}
          onChange={handleProcedureContentChange}
        />
      )}
    </div>
  );
}

export default Editor;
