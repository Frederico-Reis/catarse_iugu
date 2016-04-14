module CatarseIugu
  class PaymentEngine
    def name
      'Iugu'
    end

    def review_path(contribution)
      CatarseIugu::Engine.routes.url_helpers.review_iugu_path(contribution)
    end

    def can_do_refund?
      false
    end

    def locale
      'pt-BR'
    end
  end
end
