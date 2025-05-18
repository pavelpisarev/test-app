DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) DEFAULT 'Anonymous',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content, author) VALUES
('Пост 1', 'Это содержимое первого поста.', 'Автор 1'),
('Пост 2', 'Это второй пост с интересным контентом.', 'Автор 2'),
('Пост 3', 'Третий пост для тестирования API.', 'DevOps');