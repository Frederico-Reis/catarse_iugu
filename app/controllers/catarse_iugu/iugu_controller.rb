class CatarseIugu::IuguController < ApplicationController
  layout false

  def review
    contribution
  end

  def pay
    begin
      payment.save!
      bank_slip = !params[:bank_slip].blank?
     
      charge_params = {
        "email" => contribution.payer_email,
        "payer" => {
          "name" => contribution.payer_name
        },
        "items" => [
          {
            "description" => contribution.project.name,
            "quantity" => "1",
            "price_cents" => contribution.price_in_cents
          }
        ]
      }

      if bank_slip
        charge_params.merge!("method" => 'bank_slip')
      else
        charge_params.merge!("token" => params[:token])
      end
      
      charge = Iugu::Charge.create(charge_params)

      if bank_slip
        payment.update_attribute(:key, charge.invoice_id)
        return redirect_to charge.url
      end

      if charge.success
        flash[:notice] = "Contribuição feita com sucesso!"
        payment.pay!
        PaymentEngines.create_payment_notification contribution_id: contribution.id, payment_id: payment.payment_id
        redirect_to main_app.project_contribution_path(contribution.project, contribution)
      else
        flash[:notice] = "Houve um erro ao realizar o pagamento: #{charge.message}"
        redirect_to main_app.new_project_contribution_path(contribution.project)
      end
    rescue Exception => e
      Rails.logger.info "-----> #{e.inspect}"
      flash[:notice] = "Houve um erro ao realizar o pagamento: #{e.message}"
      return redirect_to main_app.new_project_contribution_path(contribution.project)
    end
  end

  def invoice_hook
    payment = Payment.find_by_key(params["data"]["id"])
    if payment && params["data"]["status"] == "paid"
      contribution = payment.contribution
      PaymentEngines.create_payment_notification contribution_id: contribution.id, payment_id: payment.id
      payment.pay!
      render text: 'success'
    else
      render text: 'fail'
    end
  end

  private

    def contribution
      @contribution ||= PaymentEngines.find_contribution(params[:id])
    end

    def payment
      @payment ||= PaymentEngines.new_payment(
        contribution: contribution,
        value: contribution.value,
        gateway: "Iugu",
        payment_method: 'Iugu'
      )
    end


end
