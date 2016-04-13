module Upsertable
  extend ActiveSupport::Concern

  class_methods do
    def upsert(locator, attributes)
      record = self.find_or_initialize_by(locator)
      record.update_attributes(attributes)
    end

    def upsert!(locator, attributes)
      upsert(locator, attributes) || raise(RecordNotSaved.new("Failed to save the record", self))
    end
  end
end
