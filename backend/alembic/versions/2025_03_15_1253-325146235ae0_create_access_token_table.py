"""create access_token table

Revision ID: 325146235ae0
Revises: 4459c64ab88e
Create Date: 2025-03-15 12:53:03.725237

"""
from typing import Sequence, Union

import fastapi_users_db_sqlalchemy

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '325146235ae0'
down_revision: Union[str, None] = '4459c64ab88e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('accesstoken',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=43), nullable=False),
    sa.Column('created_at', fastapi_users_db_sqlalchemy.generics.TIMESTAMPAware(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('token')
    )
    op.create_index(op.f('ix_accesstoken_created_at'), 'accesstoken', ['created_at'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_accesstoken_created_at'), table_name='accesstoken')
    op.drop_table('accesstoken')
