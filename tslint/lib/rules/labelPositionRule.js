/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new LabelPositionWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "label-position",
        description: "Only allows labels in sensible locations.",
        descriptionDetails: "This rule only allows labels to be on `do/for/while/switch` statements.",
        rationale: (_a = ["\n            Labels in JavaScript only can be used in conjunction with `break` or `continue`,\n            constructs meant to be used for loop flow control. While you can theoretically use\n            labels on any block statement in JS, it is considered poor code structure to do so."], _a.raw = ["\n            Labels in JavaScript only can be used in conjunction with \\`break\\` or \\`continue\\`,\n            constructs meant to be used for loop flow control. While you can theoretically use\n            labels on any block statement in JS, it is considered poor code structure to do so."], Lint.Utils.dedent(_a)),
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "functionality",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING = "unexpected label on statement";
    return Rule;
    var _a;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var LabelPositionWalker = (function (_super) {
    __extends(LabelPositionWalker, _super);
    function LabelPositionWalker() {
        _super.apply(this, arguments);
    }
    LabelPositionWalker.prototype.visitLabeledStatement = function (node) {
        var statement = node.statement;
        if (statement.kind !== ts.SyntaxKind.DoStatement
            && statement.kind !== ts.SyntaxKind.ForStatement
            && statement.kind !== ts.SyntaxKind.ForInStatement
            && statement.kind !== ts.SyntaxKind.ForOfStatement
            && statement.kind !== ts.SyntaxKind.WhileStatement
            && statement.kind !== ts.SyntaxKind.SwitchStatement) {
            var failure = this.createFailure(node.label.getStart(), node.label.getWidth(), Rule.FAILURE_STRING);
            this.addFailure(failure);
        }
        _super.prototype.visitLabeledStatement.call(this, node);
    };
    return LabelPositionWalker;
}(Lint.RuleWalker));
