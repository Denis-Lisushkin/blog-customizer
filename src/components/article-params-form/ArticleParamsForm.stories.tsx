import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ArticleParamsForm } from './ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
  title: 'Components/ArticleParamsForm',
  component: ArticleParamsForm,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ArticleParamsForm>;

export const Default: Story = {
  render: () => {
    const [articleState, setArticleState] = useState(defaultArticleState);

    return (
      <div style={{ height: '100vh' }}>
        <ArticleParamsForm
          articleState={articleState}
          changeArticleState={setArticleState}
        />
      </div>
    );
  },
};