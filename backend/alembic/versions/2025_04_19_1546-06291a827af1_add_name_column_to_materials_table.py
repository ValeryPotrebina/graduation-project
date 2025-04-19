"""add name column to materials table

Revision ID: 06291a827af1
Revises: 9c4ccf2f7cb8
Create Date: 2025-04-19 15:46:16.834620

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '06291a827af1'
down_revision: Union[str, None] = '9c4ccf2f7cb8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Добавляем колонку как nullable
    op.add_column('materials', sa.Column(
        'name', sa.String(length=255), nullable=True))

    # 2. Устанавливаем значения по умолчанию для существующих записей
    op.execute("UPDATE materials SET name = 'default_name' WHERE name IS NULL")

    # 3. Теперь меняем на NOT NULL
    op.alter_column('materials', 'name', nullable=False)

    # 4. Остальные изменения
    op.alter_column('materials', 'number',
                    existing_type=sa.INTEGER(),
                    nullable=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('materials', 'number',
                    existing_type=sa.INTEGER(),
                    nullable=False)

    op.drop_column('materials', 'name')
