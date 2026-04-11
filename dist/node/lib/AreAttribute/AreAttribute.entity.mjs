import { __decorateClass } from '../../chunk-EQQGB2QZ.mjs';
import { A_Entity, A_Context } from '@adaas/a-concept';
import { A_Frame } from '@adaas/a-frame';
import { AreAttributeFeatures } from './AreAttribute.constants';

let AreAttribute = class extends A_Entity {
  /**
   * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return A_Context.scope(this);
  }
  /**
   * The owner node of the attribute, which is the node that the attribute is attached to. This can be used to access the properties and features of the owner node, as well as to determine the context in which the attribute is being used. For example, if the attribute is attached to a button element, the owner would be that button node, and the attribute could use this information to modify the button's behavior or appearance based on its content and context.
   */
  get owner() {
    return this.scope.issuer();
  }
  /**
   * Initializes the attribute based on the provided properties. This method is called when a new attribute is created and should set up the attribute's state based on the provided properties. It can also be used to generate a unique ASEID for the attribute based on its name and content, which can be used for caching and identification purposes within the ARE framework.
   * 
   * @param newEntity 
   */
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      entity: newEntity.name
      // id: id,
    });
    this.name = newEntity.name;
    this.prefix = newEntity.prefix;
    this.raw = newEntity.raw;
    this.content = newEntity.content;
  }
  // =====================================================================================
  // ------------------------------- Attribute Methods ------------------------------
  // =====================================================================================
  /**
   * Creates a clone of the current attribute instance. This method can be used to create a new instance of the attribute with the same properties and state as the original, which can be useful in scenarios where you want to reuse an attribute's configuration or create variations of it without modifying the original instance.
   * 
   * @returns 
   */
  clone() {
    return new this.constructor({
      name: this.name,
      raw: this.raw,
      content: this.content,
      prefix: this.prefix
    });
  }
  // =====================================================================================
  // ------------------------------- Attribute Lifecycle ------------------------------
  // =====================================================================================
  /**
   * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
   * 
   * @param scope 
   */
  init(scope) {
    this.call(AreAttributeFeatures.Init, scope || this.scope);
  }
  /**
   * Generates all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
   * 
   * @param scope 
   */
  transform(scope) {
    this.call(AreAttributeFeatures.Transform, scope || this.scope);
  }
  compile(scope) {
    this.call(AreAttributeFeatures.Compile, scope || this.scope);
  }
  /**
   * Updates the attribute based on changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
   * 
   * @param scope 
   */
  update(scope) {
    this.call(AreAttributeFeatures.Update, scope || this.scope);
  }
  /**
   * Validates the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
   * 
   * @param scope 
   */
  validate(scope) {
    this.call(AreAttributeFeatures.Validate, scope || this.scope);
  }
};
__decorateClass([
  A_Frame.Method({
    description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime."
  })
], AreAttribute.prototype, "compile", 1);
AreAttribute = __decorateClass([
  A_Frame.Component({
    namespace: "A-ARE",
    name: "AreAttribute",
    description: "Represents an HTML attribute within the A-Concept Rendering Engine (ARE) framework, encapsulating the attribute's name, raw content, evaluated value, and associated features for initialization, transformation, compilation, updating, and validation."
  })
], AreAttribute);

export { AreAttribute };
//# sourceMappingURL=AreAttribute.entity.mjs.map
//# sourceMappingURL=AreAttribute.entity.mjs.map