import logging
from http import HTTPStatus

from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError
from services.operation.operation_service import get_portfolio_list

from api.v1.users import get_users_params

operations_bp = Blueprint("operations", __name__)


@operations_bp.route('/form', methods=['POST'])
@jwt_required()
def form_operations():
    current_user = get_jwt_identity()
    if request.method == 'POST' and request.form.get('portfolios'):
        portfolios_ids = request.form.to_dict()
        portfolios_ids['portfolios'] = portfolios_ids['portfolios'].split(',')
        print(portfolios_ids)
    return render_template('operations/operations_temp.html', **get_users_params(current_user))


@operations_bp.route('/', methods=['GET'])
@jwt_required()
def get_operations():
    current_user = get_jwt_identity()
    portfolios_list = get_portfolio_list(current_user)
    params = get_users_params(current_user)
    params['portfolios'] = []
    keys = ('id', 'account', 'strategy', 'customer', 'updated')
    for portfolio in portfolios_list:
        portfolio_params = dict(zip(keys, portfolio))
        params['portfolios'].append(portfolio_params)
    return render_template('operations/operations_temp.html', **params)